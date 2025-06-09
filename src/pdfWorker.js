import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?worker';

// Set the worker globally
GlobalWorkerOptions.workerPort = new pdfjsWorker();
