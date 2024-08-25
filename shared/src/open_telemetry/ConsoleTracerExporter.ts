import { Tracer, trace } from "@opentelemetry/api";
import { TracerExporterStrategy } from "./TracerExporterStrategy";
import { BasicTracerProvider, ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
import { SimpleSpanProcessor, BatchSpanProcessor } from "@opentelemetry/sdk-trace-node";

/* Console Tracer Strategy concrete implementation */
export class ConsoleTracerExporter implements TracerExporterStrategy {
    

    configureTracer(serviceName: string, version: string): Tracer {
        const exporter = new ConsoleSpanExporter();
        const spanProcessor = new SimpleSpanProcessor(exporter); /* compresses data and reduces the number of connections required to transmit  https://open-telemetry.github.io/opentelemetry-js/classes/_opentelemetry_sdk_trace_base.SimpleSpanProcessor.html */
        const provider = new BasicTracerProvider();

        provider.addSpanProcessor(spanProcessor);
        provider.register();

        return trace.getTracer(serviceName, version)
    }

}

