import React, { useState } from 'react';
import {IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol} from '@ionic/react';
import './Tab1.css';

import 'antd/dist/antd.css';
import { Zad1Data } from '../AddonZadania/Zad1';
import { Table, Typography } from 'antd';

const { Cell, Row }: any = Table.Summary;

const { Text } = Typography;
const Tab1: React.FC = () => {
    const [AvarageKoszt, setAvarageKoszt] = useState(0);
    const [AvarageŻycie, setAvarageŻycie] = useState(0);
    const [AvarageAtak, setAvarageAtak] = useState(0);

    const columns: any = [
        {
            title: 'CardName',
            dataIndex: 'CardName',


            sorter: (a: any, b: any) => a.CardName.localeCompare( b.CardName),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'koszt',
            dataIndex: 'koszt',
            filters: [
                {
                    text: '1',
                    value: '1',
                },
                {
                    text: '2',
                    value: '2',
                },
                {
                    text: '3',
                    value: '3',
                },
                {
                    text: '4',
                    value: '4',
                },
                {
                    text: '5',
                    value: '5',
                },
                {
                    text: '6',
                    value: '6',
                },
                {
                    text: '7',
                    value: '7',
                },
                {
                    text: '8',
                    value: '8',
                },
                {
                    text: '9',
                    value: '9',
                },
                {
                    text: 'None',
                    value: '',
                },
            ],
            filterMultiple: true,
            onFilter: (value: any, record: any) => record.koszt.indexOf(value) === 0,
            defaultSortOrder: 'descend',
            sortDirections: ['descend', 'ascend'],
            sorter: (a: any, b: any) => a.koszt - b.koszt,
            onCell: (record: any) => {
                return {
                    style: record.koszt > AvarageKoszt ? { backgroundColor: '#84e3c6' } : null,
                };
            },
        },
        {
            title: 'atak',
            dataIndex: 'atak',
            filters: [
                {
                    text: '1',
                    value: '1',
                },
                {
                    text: '2',
                    value: '2',
                },
                {
                    text: '3',
                    value: '3',
                },
                {
                    text: '4',
                    value: '4',
                },
                {
                    text: '5',
                    value: '5',
                },
                {
                    text: '6',
                    value: '6',
                },
                {
                    text: '7',
                    value: '7',
                },
                {
                    text: '8',
                    value: '8',
                },
                {
                    text: '9',
                    value: '9',
                },
                {
                    text: 'None',
                    value: '',
                },
            ],
            filterMultiple: true,
            onFilter: (value: any, record: any) => record.atak.indexOf(value) === 0,
            sorter: (a: any, b: any) => a.atak - b.atak,
            sortDirections: ['descend', 'ascend'],
            onCell: (record: any) => {
                return {
                    style: record.atak > AvarageAtak ? { backgroundColor: '#84e3c6' } : null,
                };
            },
        },
        {
            title: 'życie',
            dataIndex: 'życie',
            filters: [
                {
                    text: '1',
                    value: '1',
                },
                {
                    text: '2',
                    value: '2',
                },
                {
                    text: '3',
                    value: '3',
                },
                {
                    text: '4',
                    value: '4',
                },
                {
                    text: '5',
                    value: '5',
                },
                {
                    text: '6',
                    value: '6',
                },
                {
                    text: '7',
                    value: '7',
                },
                {
                    text: '8',
                    value: '8',
                },
                {
                    text: '9',
                    value: '9',
                },
                {
                    text: 'None',
                    value: '',
                },
            ],
            filterMultiple: true,
            onFilter: (value: any, record: any) => record.życie.indexOf(value) === 0,
            sorter: (a: any, b: any) => a.życie - b.życie,
            sortDirections: ['descend', 'ascend'],
            onCell: (record: any) => {
                return {
                    style: record.życie > AvarageŻycie ? { backgroundColor: '#84e3c6' } : null,
                };
            },
        },
        {
            title: 'typ',
            dataIndex: 'typ',
            filters: [
                {
                    text: 'Demon',
                    value: 'Demon',
                },
                {
                    text: 'Bestia',
                    value: 'Bestia',
                },
                {
                    text: 'Smok',
                    value: 'Smok',
                },
                {
                    text: 'Żywiołak',
                    value: 'Żywiołak',
                },
                {
                    text: 'Zaklęcie',
                    value: 'Zaklęcie',
                },
                {
                    text: 'None',
                    value: '',
                },
            ],
            filterMultiple: false,
            onFilter: (value: any, record: any) => record.typ.indexOf(value) === 0,
            sorter: (a: any, b: any) => a.typ.length - b.typ.length,
            sortDirections: ['descend', 'ascend'],
        },
    ];

    function onChange(pagination: any, filters: any, sorter: any, extra: any) {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Zad1</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent scrollY={false} >
                <IonGrid>

                        <IonRow>
                            <IonCol><Table
                                showHeader
                                pagination={false}
                                scroll={{ y: window.screen.height * 0.59 }}
                                columns={columns}
                                dataSource={Zad1Data}
                                onChange={onChange}
                                footer={pageData => {
                                    let totalKoszt = 0;
                                    let totalżycie = 0;
                                    let totalAtak = 0;
                                    let globalAtak = 0;
                                    let globalKoszt = 0;
                                    let globalżycie = 0;
                                    Zad1Data.forEach(({ koszt, życie, atak }) => {
                                        globalKoszt += koszt ? parseInt(koszt) : 0;
                                        globalżycie += życie ? parseInt(życie) : 0;
                                        globalAtak += atak ? parseInt(atak) : 0;
                                    });
                                    pageData.forEach(({ koszt, życie, atak }) => {
                                        totalKoszt += koszt ? parseInt(koszt) : 0;
                                        totalżycie += życie ? parseInt(życie) : 0;
                                        totalAtak += atak ? parseInt(atak) : 0;
                                    });

                                    setAvarageKoszt(totalKoszt / pageData.length);
                                    setAvarageAtak(totalAtak / pageData.length);
                                    setAvarageŻycie(totalżycie / pageData.length);

                                    return (
                                        <>
                                            <Row>
                                                <Cell>Całosciowy Koszt :</Cell>
                                                <Cell>
                                                    <Text>{globalKoszt}</Text>
                                                </Cell>
                                                <Cell>Całosciowe życie :</Cell>
                                                <Cell>
                                                    <Text>{globalżycie}</Text>
                                                </Cell>
                                                <Cell>Całosciowy atak :</Cell>
                                                <Cell>
                                                    <Text>{globalAtak}</Text>
                                                </Cell>
                                            </Row>
                                            <Row>
                                                <Cell>Totalny Koszt :</Cell>
                                                <Cell>
                                                    <Text>{totalKoszt}</Text>
                                                </Cell>
                                                <Cell>Totalne życie :</Cell>
                                                <Cell>
                                                    <Text>{totalżycie}</Text>
                                                </Cell>
                                                <Cell>Totalne atak :</Cell>
                                                <Cell>
                                                    <Text>{totalAtak}</Text>
                                                </Cell>
                                            </Row>
                                            <Row>
                                                <Cell>Avarage Koszt :</Cell>
                                                <Cell>
                                                    <Text>{AvarageKoszt}</Text>
                                                </Cell>
                                                <Cell>Avarage Atak :</Cell>
                                                <Cell>
                                                    <Text>{AvarageAtak}</Text>
                                                </Cell>
                                                <Cell>Avarage Życie :</Cell>
                                                <Cell>
                                                    <Text>{AvarageŻycie}</Text>
                                                </Cell>
                                            </Row>
                                            <Row>
                                                <Cell>Koszt / życie</Cell>
                                                <Cell colSpan={2}>
                                                    <Text type='danger'>{totalKoszt / totalżycie}</Text>
                                                </Cell>
                                            </Row>
                                            <Row>
                                                <Cell>Koszt / atak</Cell>
                                                <Cell colSpan={2}>
                                                    <Text type='danger'>{totalKoszt / totalAtak}</Text>
                                                </Cell>
                                            </Row>
                                            <Row>
                                                <Cell>Koszt / ((atak+życie)/2)</Cell>
                                                <Cell colSpan={2}>
                                                    <Text type='danger'>{totalKoszt / ((totalAtak + totalKoszt) / 2)}</Text>
                                                </Cell>
                                            </Row>
                                        </>
                                    );
                                }}
                            /></IonCol>
                        </IonRow>




                    </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
