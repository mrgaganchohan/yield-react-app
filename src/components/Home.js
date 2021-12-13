import React, { useState } from 'react'


export default function Home() {
    const getNodeUrl = () => {
        let url = ''
        if (window.location.href.includes('localhost:3000')) {
            url = 'http://localhost:5000/'
        }
        else {
            // enter node url here with proper link
            url = 'https://app-service-yield-servicebus-queue-sender.azurewebsites.net/'
        }
        return url
    }

    const getNodeUrlConsumer = () => {
        let url = ''
        if (window.location.href.includes('localhost:3000')) {
            url = 'http://localhost:5001/'
        }
        else {
            // enter node url here with proper link
            url = 'https://app-service-yield-servicebus-queue-consumer.azurewebsites.net/'
        }
        return url
    }

    const URL = getNodeUrl()
    const URL_CONSUMER = getNodeUrlConsumer()
    const [busContent, setBusContent] = useState('')
    const [addQueueLoader, setAddQueueLoader] = useState(false)
    const [consumeQueueLoader, setConsumeQueueLoader] = useState(false)
    const [retrievedBusContent, setRetrievedBusContent] = useState('')
    const successToast = () => {
        return (alert("Added to Queue - " + busContent))
    }
    return (
        <div className="ml-5">
            <h1>Yield Service Bus</h1>
            <div className="row ml-3">
                <div className="col-6" xs="6">
                    <input class="form-control"
                        aria-label="With textarea"
                        value={busContent}
                        placeholder={'Type Text here to send to service bus'}
                        onChange={e => {
                            setBusContent(e.target.value)
                        }}
                    ></input>
                </div>
                <div className="col-3" xs="3" lg="3">
                    <button type="button" class="btn btn-primary"
                        onClick={() => {
                            console.log("Message here is ", busContent)
                            setAddQueueLoader(true)

                            fetch(URL + 'sendQueue?message=' + busContent)

                                .then(response => response.json())
                                .then((data) => {
                                    if (data.success) {
                                        setAddQueueLoader(false)
                                        successToast()

                                    }
                                    setAddQueueLoader(false)

                                })

                        }}
                        disabled={busContent === '' ? true : false}>
                        {addQueueLoader === true ? <div class="row"><div class="spinner-border text-warning" role="status">
                            <span class="sr-only"></span>
                        </div>{'Send To Service Bus'}</div> :
                            'Send To Service Bus'}</button>
                </div>




            </div>
            <div className="col-3 mt-5" xs="3" lg="3">
                <button type="button"
                    class="btn btn-success"
                    onClick={() => {
                        setConsumeQueueLoader(true)

                        fetch(URL_CONSUMER + 'consumeQueue')

                            .then(response => response.json())
                            .then((data) => {
                                if (data.success) {
                                    setConsumeQueueLoader(false)
                                    setRetrievedBusContent(data.queueContent)

                                }
                                setConsumeQueueLoader(false)

                            })
                    }}

                >{consumeQueueLoader === true ? <div class="row"><div class="spinner-border text-warning" role="status">
                    <span class="sr-only"></span>
                </div>{'Consume Service Bus'}</div> :
                    'Consume Service Bus'}</button>
            </div>
            <div className="mt-4">
                {retrievedBusContent === '' ? null : <p><b>Key Received:</b>{retrievedBusContent}</p>}

            </div>
        </div>
    )
}
