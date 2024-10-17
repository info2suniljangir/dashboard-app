'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {

  
  
  // How to play with url search parameters?
  // two ways to get the searchParams
  // first one is using useSearchParams() hooks in client component.
  // second one is using searchParams props in server component.

  // useSearchParams() hook
  // used to access query parameters from url.
  // its return an instance of URLSearchParams , on which read only method are applied.
  // return a string. that can be utilized to create a new instance of URLSearchParams.
  
  // How to manipulate searchParams?
  // create a new URLSearchParams(option) instance, return it to a variable
  // now this instance can be manipulated.
  
  // Note: wrap the component that use useSearchParams() inside suspense.
  
  // Note: URLSearchParams is a powerfull web api used to play with search parameters.

  // new keyword
  // it creates a javascript object from an factory function. that can genereat number of objects.
  // the factory function can be a built in function, that known as constructor.

  // the constructor
  // with the new keyword and constructor function a new object can be created. example URLSearchParams.
  
  
  const searchParams = useSearchParams(); 
  // console.log(searchParams);//return URLSearchParams instance
  const pathName = usePathname();
  const {replace} = useRouter(); 

  // console.log(typeof(searchParams.get("query")));
  // if the type of searchParams query property is string what the need of .toString() method?


  // Note: in the typeScript constructor can only be make with class.
  // Note: arrow functions can not be used to create constructor even in javascript.
  // the syntax of arrow function is beautiful but it has limits till now.

  // debouncing a function.
  const handleSearch = useDebouncedCallback((term: string) => {
    //  Debouncing prevents a new database query on every keystroke, thus saving resources.
    // By debouncing, you can reduce the number of requests sent to your database, thus saving resources.

    // updating the url
    const params = new URLSearchParams(searchParams);
    params.set("page", "1"); //if no query then set current page to 1
    // URlSearchParams is a built-in factory function.
    // the other name of factory function is constructor.
    // it takes a string as input and create an object having key value pairs.
    // the key value pairs can be accessed and manipulated.
    // it can't manipulate actual url, it only manipulate this object.
    // this instance is used in routing.
    // make us able to play with query parameters object.
    // I have still a doubt of prototypes. and dont want to explore how the urlsearchparmas ha been consturcte.
    if (term) {
      // some kinds of prototypes are used to construct this function, thats is used to create this constructor.
      // that's the reason I don't have more clarity of it.
      params.set('query', term);
    } else {
      params.delete('query')
    }
    // the actual url is manipulated by navigation. the only way to manipulate url.
    replace(`${pathName}?${params.toString()}`); 
    
  }, 300);
  // the two important methods
  // .toString() is native javascript method, all the objects have this method.
  // this method not give useful information if applied on object directly.
  // it convert an array, a number, or a string in to a string.
  // but in the case of useSearchParams it gives the param string.

  // Number() 
  // convert any string in to number.

  // if working with json data
  // JSON.parse(jsonString) convert json in to javascript object
  // JSON.stringify(jsonObject) convert javascript object in to json.

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        // synchronize input with url
        // value attribute is used wheen working with react state.
        // but in order to work with query parameters, to synchronize the input with component, the native input state is used.
        // that's what default value does.
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
