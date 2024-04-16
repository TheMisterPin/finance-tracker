interface TextValueProps {
  type: string
  text: string;
}

function Text({ type, text }: TextValueProps) {
  switch (type) {
    case 'title':
      return <h1 className="text-[#cebbd9] font-extrabold text-4xl  text-center">{text}</h1>
    case 'price':
      return (
        <p className="">
          {' '}
          €
          {text}
        </p>
      )
    case 'pageTitle':
      return <h2 className="">{text}</h2>
    case 'subtitle':
      return <h2 className="">{text}</h2>
    case 'label':
      return <h4 className="">{text}</h4>
    case 'description':
      return <span>{text}</span>
    case 'buttonText':
      return <span className="font-akaya font-bold text-1xl text-yellow-950">{text}</span>
    default:
      return <p>{text}</p>
  }
}

export default Text
