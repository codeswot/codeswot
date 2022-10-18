import './style.css'
import v3 from '../../assets/v3.svg'

interface Blog {
    title: string;
    description: string;
    category: string;
    image: string;
   
    
   
}
export const BlogCard = ({title, description, category, image}:Blog) => {

    return (
     
                <div className="blogcard bg-silver rounded-3xl">
                    <div>
                        <img src={image} width="100%" className="rounded-t-3xl rounded-r-3xl" />
                    </div>
                    <div className='px-5 py-5'>
                        <div className='flex justify-between items-center'>
                            <div className='text-xs'>
                               {title}
                            </div>
                            <div className='bg-[#C4C4C4] p-1 rounded-full text-xs'>
                               {category}
                            </div>
                            

                        </div>
                        <div className='text-sm mt-4'>
                               {description}
                        </div>
                        <div className='flex justify-end mt-4'>
                        <img src={v3} width="20px" />

                        </div>
                    </div>


                </div>

           
    )
}