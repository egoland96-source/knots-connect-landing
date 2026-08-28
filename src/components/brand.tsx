import { Zap } from 'lucide-react';

export function Brand() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
        <Zap className="h-5 w-5 text-white" />
      </div>
      <span className="text-lg font-bold tracking-tight">Knots Connect</span>
    </div>
  );
}

export default Brand;
