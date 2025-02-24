// Rename from Home...

// Format with css
// get buttons down

// one state to hold both sides, each el is an obj: key = title : val = {
// state:
// selected: 
// }

// we render on one sider by filtering. but we need to make 2 passes

// instead we can have 2 states, representing each side, but then bring each side over is a pain.

// lets do one state
// each list item is it's own component which a checkbox thats controlled by state

// on button click, we change state

// disable buttons accordingly

export default function Home() {
  return (
    <div className="main-container">
      <div className="left-container">
        <ul>
          <li>HTML</li>
          <li>JavaScript</li>
          <li>CSS</li>
          <li>TypeScript</li>
        </ul>
      </div>
      <br />
      <div className="button-container">
        <button className="button">{">>"}</button>
        <button className="button">{">"}</button>
        <button className="button">{"<"}</button>
        <button className="button">{"<<"}</button>
      </div>
      <br />
      <div className="right-container">
        <ul>
          <li>React</li>
          <li>Angular</li>
          <li>Vue</li>
          <li>Svelte</li>
        </ul>
      </div>
    </div>
  );
}
