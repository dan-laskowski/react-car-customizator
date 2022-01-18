import React from 'react';
import Form from './Form';
import Summary from './Summary';

const App = () => {
  return (
    <div>
      <main className="mx-4 w-max-xl h-screen bg-gray-50 font-outfit flex flex-col-reverse md:flex-row ">
        <section className="mb-4 min-h-min h-1/2 md:h-auto w-full grid place-items-center ">
          <Form />
        </section>
        <section className="w-full min-h-min h-1/2 md:h-auto bg-neutral-200 rounded-lg md:rounded-l-lg my-4 md:grid md:place-items-center">
          <Summary />
        </section>
      </main>
    </div>
  );
};

export default App;
