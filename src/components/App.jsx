import React from 'react';
import Form from './Form';
import Summary from './Summary';

const App = () => {
  return (
    <div className="dark:bg-slate-900 bg-gray-50">
      <main className="mx-4 w-max-xl min-h-screen font-outfit flex flex-col-reverse md:flex-row ">
        <section className="mb-4 min-h-min  md:h-auto w-full grid place-items-center ">
          <Form />
        </section>
        <section className="w-full min-h-min h-1/2 md:h-auto dark:bg-blue-800 bg-neutral-200 rounded-lg md:rounded-l-lg my-4 md:grid md:place-items-center">
          <Summary />
        </section>
      </main>
    </div>
  );
};

export default App;
