import React from 'react';
import Form from './Form';
import Summary from './Summary';

const App = () => {
  return (
    <div>
      <main className="w-max-xl h-screen bg-gray-50 font-outfit flex flex-row overflow-hidden">
        <section className="w-full grid place-items-center ">
          <Form />
        </section>
        <section className="w-full bg-neutral-200 rounded-l-lg my-4 grid place-items-center">
          <Summary />
        </section>
      </main>
    </div>
  );
};

export default App;
