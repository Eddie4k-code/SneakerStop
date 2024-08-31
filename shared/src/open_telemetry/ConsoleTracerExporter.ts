import { Tracer, trace } from "@opentelemetry/api";
import { TracerStrategy } from "./TracerExporterStrategy";
import { BasicTracerProvider, ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
import { SimpleSpanProcessor, BatchSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { Resource } from '@opentelemetry/resources';


/* Console Tracer Strategy concrete implementation */
export class ConsoleTracerExporterSDK implements TracerStrategy {

    private _sdk: NodeSDK;
    private _serviceName: string;
    private _version: string;
    
    constructor(serviceName: string, version: string) {

        this._serviceName = serviceName;
        this._version = version
        
        this._sdk = new NodeSDK({
            resource: new Resource({
              "service.name": this._serviceName,
              "service.version": this._version
            }),
            traceExporter: new ConsoleSpanExporter(),
        })
        
    }

    public startSDK(): void {
        console.log("Starting Console Exporter");
        this._sdk.start();
    }
    public stopSDK(): void {
        console.log("Stopping Console Exporter");
        this._sdk.shutdown();
    }

    public getTracer(): Tracer {
        return trace.getTracer(this._serviceName, this._version);
    }



}

