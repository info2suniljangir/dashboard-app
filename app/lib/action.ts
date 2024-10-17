"use server";
// this directive on the top of file tells that all the functions in this files are server actions.
// these can be imported in client or server components.
// the server actions are POST route, mean server action create a POST API endpoint.
// used in dealing with forms.

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// type validation of Data, it needed to ensure the data to be sent to database is in correct format.
// zod is used because it's better than yup.
import {z} from "zod";
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';


export type State = {
    errors?: {
      customerId?: string[];
      amount?: string[];
      status?: string[];
    };
    message?: string | null;
  };


// what is a schema?
// a schema is organization of data on the database, it ensure rules for the data to be in correct format to send to database.
// it ensure the data type.
const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: "Please select a customer"
    }),
    amount: z.coerce
    .number()
    .gt(0, {
        message: "Please enter an amount greater than $0"
    }),
    status: z.enum(["pending", "paid"], {
        invalid_type_error: "Please select a status"
    }),
    date: z.string(),
});




// exclude id and date in data validation.
// these two are autommatically generated within the system thats why these are not to be validated.
const CreateInvoice = FormSchema.omit({id: true, date: true});
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

    // async function
    // if a task is time taking, then it will be executed parallel without blocking the main thread.
    // in simple words time taking tasks are asynchronous. they run in parallel instead of blocking the main thread
    // following are the async tasks
    // 1- fetching the data.
    // 2-Using the timers
    // 3- function using async await.
    // 4- Promises
    // 5- Event driven api's like eventlisteners.
    // 6- web apis
    // 7- nodejs apis.
    // 8- reading a file.
    // 9- writing a file


    // Server actions
    // Defination: Server Actions allow Client Components to call async functions executed on the server.
    // To create a post request, I need to create POST api route. but in next js this can be hanlded by server actions.
    // two ways to define a function is a server component.
    // add directive in the top of function.
    // add directive in the top of a file, it mean the entire fiel has server actions.
    // these are the functions that are executed on server, and can be import and invoked from client.
    // most of time use in mutation of data i.e. create, update, delete data.
    // Invoked from the action attribute of the native form component.
    // it takes the FormData object from form.
    // server action can be passed as a prop
    // server action can be invoked inside event handlers or async operations.
    // server actions can be invoked inside button.

    // FormData object
    // it's an instance returned from form.
    // it's an native api and methods are appplied to make operations.
    // FormData.entries() return an [[], []] iterator.
    // this iterator can be converted in to an object from Object.fromEntries() method. and then properties can be accessed.

    // explain this code.
    // const rawFormData = Object.fromEntries(formData.entries()); => convert an iterator in to object.
    // formData.entries() return an array of arrays.
    // ex const arr = [[0, "a"],[1, "b"],[2, "c"]]
    // obj = object.fromEntries(arr) convert this array in to an object and return key value pairs.
    // ex  obj = {0: "a", 1: "b", 2: "c"};
    // the value can be accessed from this object. like object.0 returns a.
    // it means the above code return an object converted from an iterator array.
    // const customerid = rawFormData.amount;
    // console.log(customerid);

    // constructer
    // what an constructor return? an instance or an object.
    // The newly created object also called as instance.
    // instance is an type of object that is created from constructer.

    // what is asynchronous programming
    //in javascript code are implemented by line by line, it means each task must wait until previous task completes.
    // this will result in the program will not be responsive.
    // this will be solved by asynchronous programming, 
    // it means if a program takes longer time, then it will be initiated  and next will be executed.
    // in terms of compiling, a thread will be initiated and the next will be executed.
    // Defination: asynchronous programming is a technique that allws a program to start 
    // (i.e. a potentially time consuming task) and move to the next one without completing previous one.
    // it enable a non blocking behavour that task will run independently.
    // it enable concurrency.
    // in real world example, fetching data will take time, because of asynchronous programming the whole programming 
    // will not be blocked from execution till the data fetch.


    // Step 4: 4 th step of authentication.
    export async function authenticate (preState: string | undefined, formData: FormData) {
        try {
            await signIn('credentials', formData);
          } catch (error) {
              if (error instanceof AuthError) {
              switch (error.type) {
                case 'CredentialsSignin':
                  return 'Invalid credentials.';
                default:
                  return 'Something went wrong.';
              }
            }
            throw error;
          }
    }

    export async function deleteInvoice (id: string) {
        // throw new Error("Invoices can not be deleted");
        // this error will show error.tsx.


        // becausse of error the following code will not reachable
        try {
            
            await sql `
            DELETE FROM invoices WHERE id = ${id}
            `;
            revalidatePath("/dashboard/invoices");
            return {message: "Invoice deleted successfully"};
        } catch (error) {
            return {
                message: "Database error, Invoice is not deleted.",
            }
        }

    }

    // id is first argument because of bind method applied.
    //this id start from table commponent to pass to the server action.
    export async function updateInvoice(id: string, prevState: State, formData: FormData) {
        
        // console.log(id, prevState, formData);
        
        const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
        })

        if (!validatedFields.success) {
            return {
              errors: validatedFields.error.flatten().fieldErrors,
              message: 'Missing Fields. Failed to Update Invoice.',
            };
          }

        const {customerId, amount, status} = validatedFields.data;
        const amountInCents = amount * 100;

        try {
            
            
            await sql `
            UPDATE invoices
            set customer_id = ${customerId}, amount = ${amount}, status = ${status}
            WHERE id = ${id}
            `
            } catch (error) {
                return {
                    message: "Database Error, Invoice is not updated.",
                }
            }

        revalidatePath("/dashboard/invoices");
        redirect("/dashboard/invoices");
    }

    // Object.fromEntries(); => return an object from an iterator of arrays. examples are following.
export async function createInvoice ( prevState: State, formData: FormData) {

    
    
    // formData object must be validated always.
    
    // in form input always return a string.
    const validatedFields = CreateInvoice.safeParse({
        // CreateInvoice is a schema and parse is method from zod.
        // .parse() check that the data is in correct format according to schema.
        // if data is not in correct format, then it will throw exception
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    }
)

// console.log(validatedFields);
// the following object given by safeParse 
// { success: false, error: [Getter] }

if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

const { customerId, amount, status } = validatedFields.data;

// the data that generated in the system not to ve validated.
// if we put date in the parsing object then it doesn't maintain consistency and looks ugly, may be that is the secodn reason.
// if the date comes from the form then it must be validated.
const amountInCents = amount * 100;
const date = new Date().toISOString().split("T")[0]; 
// .toISOString() convert the string in to ISO standard format.
// .split("T") method split date string in to two parts at T and return an array fo two element.

try {
// Note: data must be validated before send to database.
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
} catch (error) {
    // this one is new on me, learn how to hanldle this message.
    return {
        message: "Database error, failed to Create Invoice"
    };
}
    
    revalidatePath("/dashboard/invoices");
    // never put redirect in to try catch block it will send an error.
    // redirect will only reachable if try is successful
    redirect("/dashboard/invoices");
};


