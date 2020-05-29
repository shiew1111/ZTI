import './Tab5.css';
import React, { Component, useState,useContext,useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import {
    IonButton,
    IonContent,
    IonHeader, IonLoading,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Tab5.css';







const Tab5: React.FC = () => {

    const EditableContext = React.createContext<any | null>(null);
    const [Output_wpisy, setOutput_wpisy] = useState();
    const [Wpis_with_autors, setWpis_with_autors] = useState([]);
    const [Output_autorzy, setOutput_autorzy] = useState();
    const [showLoading, setShowLoading] = useState(true);

    interface Item {
        id: string;
        author_id: number;
        overriding_wpis_id: number;
        odpowiedzi_wpis_array: [];
        content : string
    }

    interface EditableRowProps {
        index: number;
    }

    const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
        const [form] = Form.useForm();
        return (
            <Form form={form} component={false}>
                <EditableContext.Provider value={form}>
                    <tr {...props} />
                </EditableContext.Provider>
            </Form>
        );
    };

    interface EditableCellProps {
        title: React.ReactNode;
        editable: boolean;
        children: React.ReactNode;
        dataIndex: any;
        record: any;
        handleSave: (record: Item) => void;
    }

    const EditableCell: React.FC<EditableCellProps> = ({
                                                           title,
                                                           editable,
                                                           children,
                                                           dataIndex,
                                                           record,
                                                           handleSave,
                                                           ...restProps
                                                       }) => {
        const [editing, setEditing] = useState(false);
        const inputRef = useRef<any>();
        const form = useContext(EditableContext);

        useEffect(() => {
            if (editing) {
                inputRef.current.focus();
            }
        }, [editing]);

        const toggleEdit = () => {
            setEditing(!editing);
            form.setFieldsValue({ [dataIndex]: record[dataIndex] });
        };

        const save = async () => {
            try {
                const values = await form.validateFields();

                toggleEdit();
                handleSave({ ...record, ...values });
            } catch (errInfo) {
                console.log('Save failed:', errInfo);
            }
        };

        let childNode = children;

        if (editable) {
            childNode = editing ? (
                <Form.Item
                    style={{ margin: 0 }}
                    name={dataIndex}
                    rules={[
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ]}
                >
                    <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                </Form.Item>
            ) : (
                <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                    {children}
                </div>
            );
        }

        return <td {...restProps}>{childNode}</td>;
    };

    class EditableTable extends React.Component {


        fetchContacts = () => {
            fetch(' http://127.0.0.1:5000/ForumZad5',
                {method:"GET",
                    headers: { "Content-Type": "application/json" }
                })
                .then(res => res.json())
                .then((data) => {
                    setOutput_autorzy(JSON.parse(data).Example_JSON_autor);
                    setOutput_wpisy( JSON.parse(data).Example_JSON_wpis);
                    let Wpis_with_autors =  JSON.parse(data).Example_JSON_wpis;
                    Wpis_with_autors.forEach(Set_autors);

                    function Set_autors(value:any) {
                        let authors_list = JSON.parse(data).Example_JSON_autor;
                        let new_author;
                        for ( let i = 0; i < authors_list.length; i++){
                            new_author =find_autors(authors_list[i],value.author_id);
                            if( new_author  != null){
                                value.Author = new_author.name +' '+  new_author.nazwisko
                            }
                        }
                    }
                    function find_autors(author:any ,author_id:any){
                        if (author.id == author_id){
                            return author
                        }
                        else return null
                    }


                    setWpis_with_autors(Wpis_with_autors);
                })
                .catch(console.log)
        };

        private columns: ({ dataIndex: string; editable: boolean; width: string; title: string } | { dataIndex: string; title: string } | { dataIndex: string; title: string } | { dataIndex: string; title: string; render: (text: any, record: any) => any })[];
        state: { count: number; dataSource: ({id: number, author_id: number, overriding_wpis_id: number, odpowiedzi_wpis_array: [],content: string})[] };




        constructor(props:any) {
            super(props);
            this.state = {
                dataSource: Wpis_with_autors,
                count: Wpis_with_autors.length,
            };


            this.columns = [
                {
                    title: 'Author',
                    dataIndex: 'Author',
                    width: '30%',
                    editable: true,
                },
                {
                    title: 'overriding_wpis_id',
                    dataIndex: 'overriding_wpis_id',
                    width: '30%',
                    editable: true,
                },

                {
                    title: 'content',
                    dataIndex: 'content',
                    editable: true,
                },
                                {
                    title: 'operation',
                    dataIndex: 'operation',
                    render: (text:any, record:any) =>
                        this.state.dataSource.length >= 1 ? (
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
                                <a>Delete</a>
                            </Popconfirm>
                        ) : null,
                },
            ];
        }

        handleDelete = (key:any) => {
            const dataSource = [...this.state.dataSource];
            this.setState({ dataSource: dataSource.filter(item => item.id !== key) });
            setWpis_with_autors(JSON.parse(JSON.stringify( dataSource.filter(item => item.id !== key))))


        };

        handleAdd = () => {
            const { count, dataSource } = this.state;


            const newData = {
                "id": count+1, "author_id": 1, "overriding_wpis_id": 0, "odpowiedzi_wpis_array": [], "content": "Example_content","Author": "Marek Demkowicz"
            };

            setWpis_with_autors(JSON.parse(JSON.stringify([...dataSource, newData])));
            this.setState({
                dataSource: [...dataSource, newData],
                count: count + 1,
            });


        };

        handleSave = (row:any) => {
            const newData = [...this.state.dataSource];
            const index = newData.findIndex(item => row.id === item.id);
            const item = newData[index];
            newData.splice(index, 1, {
                ...item,
                ...row,
            });
            this.setState({ dataSource: newData });
            setWpis_with_autors(JSON.parse(JSON.stringify(this.state.dataSource)))
        };

        render() {
            const { dataSource } = this.state;
            const components = {
                body: {
                    row: EditableRow,
                    cell: EditableCell,
                },
            };
            const columns = this.columns.map((col:any) => {
                if (!col.editable) {
                    return col;
                }
                return {
                    ...col,
                    onCell: (record:any) => ({
                        record,
                        editable: col.editable,
                        dataIndex: col.dataIndex,
                        title: col.title,
                        handleSave: this.handleSave,
                    }),
                };
            });
            return (
                <div>
                    <IonLoading
                        isOpen={showLoading}
                        onWillDismiss={()=>{
                            this.fetchContacts();

                        }}
                        onDidDismiss={() => {
                            setShowLoading(false);

                        }}
                        message={'Please wait...'}
                        duration={10}
                    />
                    <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                        Add a row
                    </Button>
                    <Table
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
            );
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>

                        <h1>Zad5</h1>


                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                <EditableTable />


                <IonText color='secondary'>
                    <h1>{JSON.stringify(Output_autorzy)}</h1>
                    <h1>{JSON.stringify(Output_wpisy)}</h1>
                    <h1>{JSON.stringify(Wpis_with_autors)}</h1>

                </IonText>
            </IonContent>
        </IonPage>
    );
};
export default Tab5;
