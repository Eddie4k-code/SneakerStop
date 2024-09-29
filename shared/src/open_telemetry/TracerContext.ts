import { Tracer } from "@opentelemetry/api";
import { TracerStrategy } from "./TracerExporterStrategy";

/* Holds reference to the tracer exporter strategy, and delegates tasks to the concrete implementation */
export class TracerContext {
    
    private _tracerStrategy: TracerStrategy;


    constructor(tracerStrategy: TracerStrategy) {
        this._tracerStrategy = tracerStrategy;        
    }

    public setTracerStrategy(tracerStrategy: TracerStrategy): void {
        this._tracerStrategy = tracerStrategy;
    }

    public startSDK(): void {
        this._tracerStrategy.startSDK();
    }

    public getTracer(serviceName: string, version: string): Tracer {
        return this._tracerStrategy.getTracer(serviceName, version);
    }

}