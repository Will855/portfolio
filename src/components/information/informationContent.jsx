import React from "react";
import WordCloud from '../cloudWords';
import Information from "../../pages/information";

const InformationContent = ()=>{
    return<>
    
    <div className="mx-auto w-2/3">
          {/* Contenedor de información */}
        <div className="p-8 text-slate-50 flex flex-col gap-12" id='glass'>
            <div>
                <h1 className='font-semibold text-5xl'>¿Quien soy?</h1>
                <p className='text-md md:text-lg text-justify pt-2 sm:pt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui eum recusandae praesentium illo culpa eveniet vitae nesciunt iste. Doloribus, voluptatem earum qui rerum asperiores nulla alias enim necessitatibus beatae excepturi, saepe dolore nihil esse, veniam quos unde quasi itaque ad iusto obcaecati exercitationem voluptas provident optio numquam.</p>
            </div>
                
            <div>
                <WordCloud/>
            </div>

            <div>
                <p className='text-md md:text-lg text-justify pt-2 sm:pt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui eum recusandae praesentium illo culpa eveniet vitae nesciunt iste. Doloribus, voluptatem earum qui rerum asperiores nulla alias enim necessitatibus beatae excepturi, saepe dolore nihil esse, veniam quos unde quasi itaque ad iusto obcaecati exercitationem voluptas provident optio numquam.</p>
            </div>

        </div>
    </div>
    </>;
}

export default InformationContent;