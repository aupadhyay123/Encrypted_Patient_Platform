export default function FormInput(props) {
  return (
    <div>
      <h3>{props.title}</h3>
      <input type={props.type}></input>
    </div>
  );
}