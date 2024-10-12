import { Tracer, trace } from "@opentelemetry/api";
import { TracerStrategy } from "./TracerExporterStrategy";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-node";
import { Resource } from '@opentelemetry/resources';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin'

export class ZipkinExporterStrategy implements TracerStrategy {

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
            traceExporter: new ZipkinExporter({
                url: 'http://zipkin:9411'
            })
        })
        
    }

    startSDK(): void {
        console.log("Starting Zipkin Exporter");
        this._sdk.start();
    }
    stopSDK(): void {
        console.log("Stopping Console Exporter");
        this._sdk.shutdown();
    }
    getTracer(serviceName: string, version: string): Tracer {
        return trace.getTracer(this._serviceName, this._version);
    }
    
}