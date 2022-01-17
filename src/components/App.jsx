import React from 'react';
import Form from './Form';
import Summary from './Summary';

const App = () => {
  return (
    <div>
      <main className="w-max-2xl h-screen bg-gray-50 flex flex-row">
        <section className="w-full ">
          <Form />
        </section>
        <section className="w-full bg-neutral-200 rounded-l-lg my-4">
          <Summary />
        </section>
      </main>
    </div>
  );
};

export default App;
