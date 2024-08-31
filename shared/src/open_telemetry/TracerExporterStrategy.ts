import { NodeSDK } from '@opentelemetry/sdk-node';
import {trace, Span, TracerProvider, Tracer} from "@opentelemetry/api";
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} from '@opentelemetry/sdk-metrics';


/* Concrete Strategy Implementations for tracers in open telemetry will utilize this */
export interface TracerStrategy {
    startSDK(): void;
    stopSDK(): void;
    getTracer(serviceName: string, version: string): Tracer
}


