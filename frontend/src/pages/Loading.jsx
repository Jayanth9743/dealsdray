import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-[100vh]">
        <AiOutlineLoading3Quarters className="text-5xl text-primary animate-spin"/>
    </div>
  )
}

export default Loading
