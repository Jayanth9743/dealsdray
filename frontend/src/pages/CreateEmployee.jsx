

const CreateEmployee = () => {
  return (
    <div className="flex items-center justify-center w-full mt-40 mb-4 ">
        <form className="flex flex-col items-center justify-center w-[40%] gap-6 rounded-xl bg-secondary">
            <div className="flex flex-col items-start justify-center w-4/5 gap-2 mt-8">
                <p className="text-lg font-semibold ">name</p>
                <input type="text" className="w-full p-2 rounded-md" />
            </div>
            <div className="flex flex-col items-start justify-center w-4/5 gap-2">
                <p className="text-lg font-semibold ">email</p>
                <input type="email" className="w-full p-2 rounded-md" />
            </div>
            <div className="flex flex-col items-start justify-center w-4/5 gap-2">
                <p className="text-lg font-semibold ">mobile number</p>
                <input type="text" className="w-full p-2 rounded-md" />
            </div>
            <div className="flex flex-col items-start justify-center w-4/5 gap-2">
            <p className="text-lg font-semibold ">designation</p>
          <select
            name="designation"
            className="w-full p-2 border border-black border-solid rounded-md">
            <option value="" disabled>
              Select Designation
            </option>
            <option value="Hr">Hr</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
            <div className="flex flex-col items-start justify-center w-4/5 gap-2">
                <p className="text-lg font-semibold ">Gender</p>
                <div className="flex items-center text-lg font-medium justify-around w-[60%]">
                <label>
                <input
                    type="radio"
                    name="gender"
                    value="Male"
                    
                />
                Male
                </label>
                <label>
                <input
                    type="radio"
                    name="gender"
                    value="Female"
                    
                />
                Female
                </label>
                <label>
                <input
                    type="radio"
                    name="gender"
                    value="Others"
                    
                />
                Others
                </label>
                </div>
            </div>
            <div className="flex flex-col items-start justify-center w-4/5 gap-2">
                <p className="text-lg font-semibold ">course</p>
                <div className="flex items-center text-lg font-medium justify-around w-[60%]">
                <label>
                <input
                    type="checkbox"
                    name="course"
                    value="MCA"
                    
                />
                MCA
                </label>
                <label>
                <input
                    type="checkbox"
                    name="course"
                    value="BCA"
                    
                />
                BCA
                </label>
                <label>
                <input
                    type="checkbox"
                    name="course"
                    value="BSC"
                    
                />
                BSC
                </label>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center w-4/5 gap-2 mt-8">
                <p className="text-lg font-semibold ">image upload</p>
                <input type="file" className="p-2 rounded-md " 
                accept="image/png, image/jpeg"/>
            </div>
            <button className="w-[25%] mb-8 text-white text-lg rounded-md bg-blue-500 p-2">submit</button>
        </form>
    </div>
  )
}

export default CreateEmployee
