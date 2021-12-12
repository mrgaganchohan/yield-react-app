import React, {useState} from 'react'

export default function Home() {
    const[busContent, setBusContent] = useState('')
    return (
        <div className="ml-5">
            <h1>Yield Service Bus</h1>
            <div className="row ml-3">
              <div className="col-6" xs="6">
                <input class="form-control" 
                aria-label="With textarea" 
                value={busContent}
                placeholder={'Type Text here to send to service bus'}
                onChange={e=>{
                    setBusContent(e.target.value)
                }}
                ></input>
              </div>
              <div className="col-3" xs="3" lg="3">
                  <button type="button" class="btn btn-primary" disabled={busContent===''?true:false}>Send To Service Bus</button>
              </div>

              


            </div>
            <div className="col-3 mt-5" xs="3" lg="3">
                  <button type="button" class="btn btn-success">Consume one message</button>
            </div>

        </div>
    )
}
