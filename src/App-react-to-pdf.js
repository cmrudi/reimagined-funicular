import React, { useState, useRef } from 'react';
import './App.css';
import {Resizable} from 're-resizable'
import Draggable from 'react-draggable'
import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";
import Pdf from 'react-to-pdf'
const ref = React.createRef();


function App() {
    const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url
    const sigCanvas = useRef({});
    const clear = () => sigCanvas.current.clear();
    const save = () => setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));


    return (
        <div className="App">
            <Popup
                modal
                trigger={<button>Open Signature Pad</button>}
                closeOnDocumentClick={false}
            >
                {close => (
                    <>
                        <SignaturePad
                            ref={sigCanvas}
                            canvasProps={{
                                className: "signatureCanvas"
                            }}
                        />
                        <br />
                        {/* Button to trigger save canvas image */}
                        <button onClick={save}>Save</button>
                        <button onClick={clear}>Clear</button>
                        <button onClick={close}>Close</button>
                    </>
                )}
            </Popup>
            <br />
            <br />
            {/* if our we have a non-null image url we should
          show an image and pass our imageURL state to it*/}

            <div>
                <Pdf targetRef={ref} filename="code-example.pdf">
                    {({toPdf}) => <button onClick={toPdf}>Generate Pdf</button>}
                </Pdf>
                <Draggable>
                    <Resizable
                        defaultSize={{
                            width: 200,
                            height: 360
                        }}
                        lockAspectRatio={true}
                    >
                        <input type="text" id="fname" name="fname">
                        </input>
                    </Resizable>
                </Draggable>
                {imageURL ? (
                    <Draggable>
                        <Resizable
                            defaultSize={{
                                width: 200,
                                height: 360
                            }}
                            style={{
                                background: `url(${imageURL})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat'
                            }}
                            lockAspectRatio={true}
                        >
                        </Resizable>
                    </Draggable>
                ) : null}
                <div className="pdfImage" ref={ref}
                    style={{backgroundImage: `url("https://storage.googleapis.com/legaltech-esign-develop/test/sample-pdf.jpg")`}}>
                </div>
                <div className="pdfImage" ref={ref}
                     style={{backgroundImage: `url("https://storage.googleapis.com/legaltech-esign-develop/test/sample-pdf.jpg")`}}>
                </div>
            </div>
        </div>
    )
}
export default App;
