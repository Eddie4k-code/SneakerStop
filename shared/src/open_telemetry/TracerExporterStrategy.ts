import { NodeSDK } from '@opentelemetry/sdk-node';
import {trace, Span, TracerProvider, Tracer} from "@opentelemetry/api";
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} from '@opentelemetry/sdk-metrics';


/* Concrete Strategy Implementations for tracer exporters in open telemetry will utilize this */
export abstract class TracerExporterStrategy {

    abstract configureTracer(serviceName: string, version: string): Tracer
    
}


