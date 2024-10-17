'use client';
// Note: error.tsx is an client component.
 
import { useEffect } from 'react';



// handling errors
// errors are of two types
// 1=> expected errors shown by if(!notOk) { then execute this block}
// but in the client component these types of errors hanlded by useActonState hook.
// 2=> uncaught errros handled by error.tsx, globla-error.tsx within app directory. this uses error boundary.
 


// catch all the errors within this invoices route and show a fallback ui.
export default function Error({
  error,
  reset,
}: {
    // error is the instance of javascript native Error obeject.
  error: Error & { digest?: string };
//   reset the error boundary mean rerener the route segment.
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}