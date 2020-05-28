import React, { Component, useState } from 'react';
import {
    IonAlert,
    IonButton,
    IonContent,
    IonHeader,
    IonLoading,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Tab4.css';

const farmId = '1';

const Tab4: React.FC = () => {
    const [showLoading, setShowLoading] = useState(true);

    const [FarmState, setFarmState] = useState('');
    const [SowingTimer, setSowingTimer] = useState('');
    const [ButtonHarvestFarmDisable, setButtonHarvestFarmDisable] = useState(false);
    const [ButtonSowingFarmDisable, setButtonSowingFarmDisable] = useState(false);
    const [ShowAlert,setShowAlert]=useState(false);
    function alert() {
        let JsonFarmState: any = JSON.parse(FarmState);
        let gold: number = parseInt(JSON.stringify(JSON.parse(JsonFarmState).gold));
        let costOfSowing: number = parseInt(JSON.stringify(JSON.parse(JsonFarmState).costOfSowing));
        let isHarvested: number = parseInt(JSON.stringify(JSON.parse(JsonFarmState).isHarvested));
        if (gold<costOfSowing &&  isHarvested==0){

            setShowAlert(true);

            setButtonSowingFarmDisable(true);
            setButtonHarvestFarmDisable(true);


        }


    }







    class SowingFarm extends Component {


        fetchFarm = (farmId: string) => {
            fetch('http://127.0.0.1:5000/FarmGame?farmId=' + farmId, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(data => {
                    setFarmState(JSON.stringify(data));
                })
                .catch(console.log);
        };

        sowingFarm = (farmId: string) => {
            fetch('http://127.0.0.1:5000/FarmGame?farmId=' + farmId + '&action=Sowing', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(data => {
                    setFarmState(JSON.stringify(data));
                })
                .catch(console.log);
        };
        initTimer = (FarmState: string) => {
            let JsonFarmState: any = JSON.parse(FarmState);

            let distance: number = parseInt(JSON.stringify(JSON.parse(JsonFarmState).RemainingTime));
            let harvested: number = parseInt(JSON.stringify(JSON.parse(JsonFarmState).isHarvested));
            // Update the count down every 1 second
            let x = setInterval(function () {
                distance = distance - 1;
                console.log(distance);
                setSowingTimer(distance + 's ');
                setButtonHarvestFarmDisable(true);
                setButtonSowingFarmDisable(true);

                if (distance < 0) {
                    clearInterval(x);

                    if (harvested==1) {
                        setSowingTimer('Gotowe do obsiania!');

                        setButtonHarvestFarmDisable(true);
                        setButtonSowingFarmDisable(false);
                    }
                    else {
                        setSowingTimer('Gotowe do zbioru!');
                        setButtonHarvestFarmDisable(false);
                        setButtonSowingFarmDisable(true);

                    }
                }
            }, 1000);
        };

        sowingTimer = (FarmState: string) => {
            let JsonFarmState: any = JSON.parse(FarmState);

            let distance: number = parseInt(JSON.stringify(JSON.parse(JsonFarmState).growTime));

            // Update the count down every 1 second
            let x = setInterval(function () {
                distance = distance - 1;
                console.log(distance);
                setSowingTimer(distance + 's ');

                if (distance < 0) {
                    clearInterval(x);
                    setSowingTimer('Gotowe do zbioru!');

                    setButtonHarvestFarmDisable(false);
                }
            }, 1000);
        };

        render() {
            return (
                <IonButton
                    disabled={ButtonSowingFarmDisable}
                    onClick={() => {
                        this.sowingFarm(farmId);
                        this.fetchFarm(farmId);
                        this.sowingTimer(FarmState);
                        setButtonSowingFarmDisable(true);
                        setButtonHarvestFarmDisable(true);
                        alert()
                    }}
                >
                    Sowing Farm

                    <IonLoading
                        isOpen={showLoading}
                        onWillDismiss={()=>{
                            this.fetchFarm(farmId);

                        }}
                        onDidDismiss={() => {
                            setShowLoading(false);
                            setButtonSowingFarmDisable(true);
                            setButtonHarvestFarmDisable(true);
                            this.initTimer(FarmState);
                            alert()


                        }}
                        message={'Please wait...'}
                        duration={10}
                    />
                </IonButton>
            );
        }
    }

    class HarvestFarm extends Component {
        harvestFarm = (farmId: string) => {
            fetch('http://127.0.0.1:5000/FarmGame?farmId=' + farmId + '&action=harvest', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(data => {
                    setFarmState(JSON.stringify(data));
                    setSowingTimer('Gotowe do obsiania!');
                })
                .catch(console.log);
        };
        render() {
            return (
                <IonButton
                    disabled={ButtonHarvestFarmDisable}
                    onClick={() => {
                        this.harvestFarm(farmId);
                        setButtonSowingFarmDisable(false);
                        setButtonHarvestFarmDisable(true);
                    }}
                >
                    Harvest Farm
                </IonButton>
            );
        }
    }

    class UpdateFarm extends Component {
        UpdateFarm = (farmId: string) => {
            fetch('http://127.0.0.1:5000/FarmGame?farmId=' + farmId + '&action=UpdateFarm', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(data => {
                    setFarmState(JSON.stringify(data));
                })
                .catch(console.log);
        };
        render() {
            return (
                <IonButton
                    onClick={() => {
                        this.UpdateFarm(farmId);
                        alert()
                    }}
                >
                    Update Farm
                </IonButton>
            );
        }
    }

    setTimeout(() => {
        setShowLoading(false);
    }, 2000);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        <SowingFarm />
                        {SowingTimer}


                    </IonTitle>
                    <IonTitle>
                        <UpdateFarm />
                    </IonTitle>
                    <IonTitle>
                        <HarvestFarm />
                    </IonTitle>
                    <IonTitle>
                        <IonAlert
                            isOpen={ShowAlert}
                            onDidDismiss={() => setShowAlert(false)}
                            header={'GAME OVER'}
                            message={'Przegrany wpisuje 5 do indeksu :) '}
                            backdropDismiss ={false}

                        />
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonText color='secondary'>
                    <h1>{FarmState}</h1>
                </IonText>
            </IonContent>
        </IonPage>
    );
};

export default Tab4;
