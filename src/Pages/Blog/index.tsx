import { BlogCard } from "../../component/Core/BlogCard"
import code from '../../assets/code.svg'

const blog =[
    {
        title: "How to use the canvas in Flutter",
        description: "Follow up to see how easy it is to build a simple canvas in flutter with details of how to run a lorem ipsum script for the normal people hehe, am i lossing it ? i think not ...",
        category: "Written",
        image: code,

    },
    {
        title: "How to use the canvas in Flutter",
        description: "Follow up to see how easy it is to build a simple canvas in flutter with details of how to run a lorem ipsum script for the normal people hehe, am i lossing it ? i think not ...",
        category: "Written",
        image: code,

    },
    {
        title: "How to use the canvas in Flutter",
        description: "Follow up to see how easy it is to build a simple canvas in flutter with details of how to run a lorem ipsum script for the normal people hehe, am i lossing it ? i think not ...",
        category: "Written",
        image: code,

    },
    {
        title: "How to use the canvas in Flutter",
        description: "Follow up to see how easy it is to build a simple canvas in flutter with details of how to run a lorem ipsum script for the normal people hehe, am i lossing it ? i think not ...",
        category: "Written",
        image: code,

    },
    {
        title: "How to use the canvas in Flutter",
        description: "Follow up to see how easy it is to build a simple canvas in flutter with details of how to run a lorem ipsum script for the normal people hehe, am i lossing it ? i think not ...",
        category: "Written",
        image: code,

    },
    {
        title: "How to use the canvas in Flutter",
        description: "Follow up to see how easy it is to build a simple canvas in flutter with details of how to run a lorem ipsum script for the normal people hehe, am i lossing it ? i think not ...",
        category: "Written",
        image: code,

    },
    {
        title: "How to use the canvas in Flutter",
        description: "Follow up to see how easy it is to build a simple canvas in flutter with details of how to run a lorem ipsum script for the normal people hehe, am i lossing it ? i think not ...",
        category: "Written",
        image: code,

    },
    {
        title: "How to use the canvas in Flutter",
        description: "Follow up to see how easy it is to build a simple canvas in flutter with details of how to run a lorem ipsum script for the normal people hehe, am i lossing it ? i think not ...",
        category: "Written",
        image: code,

    },
]

export const BlogScreen = () => {

    return (
        <div className="grid grid-cols-1 place-items-center">
            <div className='mb-10 text-center '>
                <div className="text-white text-3xl font-bold">
                    All Blog & Posts
                </div>
                <div className="text-primary text-lg font-bold">A list of all my blogs and posts</div>
            </div>
            <div className="">
            <div className="grid md:grid-cols-3 gap-16 ">
               {
                blog.map((item, idx) => (
                   <div className="md:w-72">
                     <BlogCard title={item.title} category={item.category} description={item.description} image={item.image} />
                   </div>
                ))
               }
                
               

            </div>
            </div>

        </div>
    )
}