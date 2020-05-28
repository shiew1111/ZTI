import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { Input } from 'antd';
import './Tab2.css';
const { TextArea } = Input;

const Tab2: React.FC = () => {

    const [Output, setOutput] = useState('');

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Zad 2</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <TextArea
                    rows={10}
                    onChange={e => {


                        let stack = [];
                        let OutputString;
                        let mistakeIndex = null;
                        let InputArray = e.target.value.split('');
                        let InputArrayLen = InputArray.length;
                        let HCounter = 0;
                        for (let i = 0; i < InputArrayLen; i++) {
                            switch (InputArray[i]) {
                                case '{':
                                    stack.push('{');

                                    InputArray[i] = '<aside cat=”';

                                    break;
                                case '}':
                                    if (stack[stack.length - 1] === '|') {
                                        stack.pop();
                                        stack.push('}');


                                        InputArray[i] = '</header><main>';
                                    } else {
                                        mistakeIndex = i;
                                        setOutput(
                                            JSON.stringify({ OutputString: OutputString, mistakeIndex: mistakeIndex })
                                        );
                                    }

                                    break;
                                case '#':
                                    stack.push('#');
                                    HCounter++;
                                    InputArray[i] = '<h' + HCounter + ' id=”nX”>';

                                    break;
                                case '\n':
                                    if (stack[stack.length - 1] === '#') {
                                        stack.pop();

                                        InputArray[i] = '</h' + HCounter + '>';

                                    }
                                    else if(stack[stack.length - 1] === '}'){
                                        stack.pop();


                                        InputArray[i] = '</main></aside>';
                                    }
                                    else {
                                        mistakeIndex = i;
                                        setOutput(
                                            JSON.stringify({ OutputString: OutputString, mistakeIndex: mistakeIndex })
                                        );
                                    }

                                    break;
                                case '[':
                                    stack.push('[');

                                    InputArray[i] = '<a href=”';

                                    break;
                                case '|':
                                    if (stack[stack.length - 1] === '[') {
                                        stack.pop();
                                        stack.push('|');

                                        InputArray[i] = '”>';
                                    }
                                    else if(stack[stack.length - 1] === '{'){
                                        stack.pop();
                                        stack.push('|');

                                        InputArray[i] = '”> <header>';
                                    }


                                    else {
                                        mistakeIndex = i;
                                        setOutput(
                                            JSON.stringify({ OutputString: OutputString, mistakeIndex: mistakeIndex })
                                        );
                                    }
                                    break;
                                case ']':
                                    if (stack[stack.length - 1] === '|') {
                                        stack.pop();

                                        InputArray[i] = '</a>';
                                    } else {
                                        mistakeIndex = i;
                                        setOutput(
                                            JSON.stringify({ OutputString: OutputString, mistakeIndex: mistakeIndex })
                                        );
                                    }
                                    break;
                                case '>':
                                    if (InputArray[i + 1] === '>') {
                                        stack.push('>>');

                                        delete InputArray[i + 1];
                                        InputArray[i] = '<q>';
                                        i++;
                                    }

                                    break;
                                case '<':
                                    if (InputArray[i + 1] === '<') {
                                        if (stack[stack.length - 1] === '>>') {
                                            stack.pop();

                                            delete InputArray[i + 1];
                                            InputArray[i] = '</q>';
                                            i++;
                                        } else {
                                            mistakeIndex = i;
                                            setOutput(
                                                JSON.stringify({
                                                    OutputString: OutputString,
                                                    mistakeIndex: mistakeIndex,
                                                })
                                            );
                                        }
                                    }

                                    break;
                                case '*':
                                    switch (stack[stack.length - 1]) {
                                        case '*':
                                            if (InputArray[i + 1] === '*') {
                                                stack.push('**');

                                                delete InputArray[i + 1];
                                                InputArray[i] = '<strong>';
                                                i++;
                                            } else {

                                                stack.pop();

                                                InputArray[i] = '</em>';
                                                i++;
                                            }
                                            break;

                                        case '**':
                                            if (InputArray[i + 1] === '*') {
                                                stack.pop();

                                                delete InputArray[i + 1];
                                                InputArray[i] = '</strong>';
                                                i++;
                                            } else {
                                                stack.push('*');

                                                InputArray[i] = '<em>';
                                                i++;
                                            }
                                            break;

                                        default:
                                            if (InputArray[i + 1] === '*') {
                                                stack.push('**');

                                                delete InputArray[i + 1];
                                                InputArray[i] = '<strong>';
                                                i++;
                                            } else {
                                                stack.push('*');

                                                InputArray[i] = '<em>';
                                                i++;
                                            }
                                            break;
                                    }

                                    break;
                                case '_':
                                    if (InputArray[i + 1] === '!') {
                                        stack.push('_!');
                                        delete InputArray[i + 1];
                                        InputArray[i] = '<ins>';
                                        i++;
                                    }

                                    break;

                                case '!':
                                    if (InputArray[i + 1] === '_') {
                                        if (stack[stack.length - 1] === '_!') {
                                            stack.pop();
                                            delete InputArray[i + 1];
                                            InputArray[i] = '</ins>';
                                            i++;
                                        } else {
                                            mistakeIndex = i;
                                            return { OutputString: OutputString, mistakeIndex: mistakeIndex };
                                        }
                                    } else if (InputArray[i + 1] === '-') {
                                        if (stack[stack.length - 1] === '-!') {
                                            stack.pop();
                                            delete InputArray[i + 1];
                                            InputArray[i] = '</del>';
                                            i++;
                                        } else {
                                            mistakeIndex = i;
                                            setOutput(
                                                JSON.stringify({
                                                    OutputString: OutputString,
                                                    mistakeIndex: mistakeIndex,
                                                })
                                            );
                                        }
                                    }

                                    break;
                                case '-':
                                    if (InputArray[i + 1] === '!') {
                                        stack.push('-!');
                                        delete InputArray[i + 1];
                                        InputArray[i] = '<del>';
                                        i++;
                                    }

                                    break;
                            }
                        }

                        OutputString = InputArray.join('');

                        ///Input.replace('>>', '<q>').replace('<<', '</q>');
                        setOutput(JSON.stringify({ OutputString: OutputString, mistakeIndex: mistakeIndex }));
                    }}
                />
                <IonText color='secondary'>
                    <h1>{Output}</h1>
                </IonText>
            </IonContent>
        </IonPage>
    );
};

export default Tab2;
