

function Button(props) {
  return (
    <button
      {...props}
      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded text-xs"
    />
  );
}

export default Button;
