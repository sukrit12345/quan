// rout app/lib/event
const generateEvents = () => {
    const events = [];
  
    for (let age = 1; age <= 100; age++) {
      const maleEvents = [
        { text: "Play soccer", effects: { happiness: 5, health: 2 } },
        { text: "Fight with a friend", effects: { relationship: -5, health: -2 } },
        { text: "Find a lost dog", effects: { happiness: 10, lucky: 5 } },
        { text: "Win a math contest", effects: { knowledge: 10, happiness: 5 } },
        { text: "Join a sports team", effects: { health: 5, relationship: 5 } },
      ];
  
      const femaleEvents = [
        { text: "Take a ballet class", effects: { happiness: 5, health: 2 } },
        { text: "Make a new best friend", effects: { relationship: 10, happiness: 5 } },
        { text: "Help an old lady cross the street", effects: { happiness: 5, lucky: 5 } },
        { text: "Ace a science quiz", effects: { knowledge: 10, happiness: 5 } },
        { text: "Adopt a kitten", effects: { happiness: 10, relationship: 5 } },
      ];
  
      events.push({
        age: age,
        question: `You are ${age} years old. What will you do?`,
        choices: {
          male: maleEvents.map((event) => ({
            text: event.text,
            effects: event.effects,
          })),
          female: femaleEvents.map((event) => ({
            text: event.text,
            effects: event.effects,
          })),
        },
      });
    }
  
    return events;
  };
  
  const events = generateEvents();
  export default events;
  