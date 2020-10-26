import { IncomingMessage, ServerResponse } from "http";


export { kras }
var kras = {
    services: {
        "test": function(res :ServerResponse, req :IncomingMessage, db, type) {
        

            res.end("Hello World");
        }
    }
}
