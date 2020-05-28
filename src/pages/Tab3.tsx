import React, {useState, Component} from 'react';
import {IonButton, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar} from '@ionic/react';
import './Tab3.css';
import { Input } from 'antd';

const { TextArea } = Input;

const Tab3: React.FC = () => {
    class Request extends Component {

        componentDidMount() {
            this.fetchContacts();
        }

        fetchContacts = () => {
            fetch(' http://127.0.0.1:5000/Forum',
                {method:"GET",
                    headers: { "Content-Type": "application/json" }
                })
                .then(res => res.json())
                .then((data) => {
                    setOutput(data)
                })
                .catch(console.log)
        };

        postContact = () => {
            fetch(' http://127.0.0.1:5000/Forum',
                {method:"POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        "id": "1",
                        "author": "Example_autor",
                        "content": Input

                    }) })
                .then(res => res.json())
                .then(() => {
                    setInput("")
                })
                .catch(console.log)
        };
        render() {
            return (
                <IonButton onClick={() => {this.postContact(); this.fetchContacts(); setInput("")}  }>
                    Click
                </IonButton>
            );
        }
    }
    
    const [Input, setInput] = useState('');
    const [Output, setOutput] = useState('');


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><Request  /></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
            <TextArea
                rows={10}
                onChange={e => {setInput(e.target.value);}}
                value={Input}
            />


          <IonText color='secondary'>
              <h1>{Output}</h1>
          </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
