import React from 'react'

const Card = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-16 mt-10">
      <div className="bg-[#BB0545] rounded-lg shadow-md p-6 text-white" data-aos="flip-left" data-aos-duration="1000">
        <h3 className="text-xl font-semibold mb-4">Card Title 1</h3>
        <p className="">This is a description for card 1. It provides some information about the content of the card.</p>
      </div>
      <div className="bg-[#BB0545] rounded-lg shadow-md p-6 text-white" data-aos="flip-left" data-aos-duration="1000">
        <h3 className="text-xl font-semibold mb-4">Card Title 2</h3>
        <p className="">This is a description for card 2. It provides some information about the content of the card.</p>
      </div>
      <div className="bg-[#BB0545] rounded-lg shadow-md p-6 text-white" data-aos="flip-right" data-aos-duration="1000">
        <h3 className="text-xl font-semibold mb-4">Card Title 3</h3>
        <p className="">This is a description for card 3. It provides some information about the content of the card.</p>
      </div>
    </div>
  )
}

export default Card