import React, { useState } from "react";
import data from "./data";
import List from "./List";
function App() {
  const [people, setPeople] = useState(data);

  const onclickHandler = () => {
    setPeople([]);
  };

  return (
    <main>
      <section className="container">
        <h3>{people.length} Birthday Today</h3>
        <List people={people} />
        <button onClick={onclickHandler}>clear all</button>
      </section>
    </main>
  );
}

export default App;
