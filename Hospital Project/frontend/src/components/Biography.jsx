import React from "react";

const Biography = ({imageUrl})=>{
    return (
        <div className="container biography">
         <div className="banner">
          <img src={imageUrl} alt="aboutImg" />
         </div>
          <div className="banner">
            <p> Biography</p> 
            <h3> Who We Are</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus dolorem eaque temporibus sequi perferendis aspernatur libero distinctio eligendi voluptates nulla! At totam sapiente voluptates amet inventore nisi nobis nesciunt ipsa. Ipsam nam temporibus rem, qui dolorem dicta non exercitationem ut hic nulla unde nobis animi autem enim placeat reiciendis esse.
            </p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </p>
            <p>Lorem ipsum dolor sit amet. </p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa odit aperiam iusto sapiente, dolore odio, porro consectetur est repellendus nemo repellat! Velit, impedit. Saepe repudiandae, fugiat ab consequuntur accusantium debitis dolor iure error obcaecati neque.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium a commodi numquam. </p>
            <p>Lorem, ipsum dolor.</p>
          </div>
         
        </div>
    )
}

export default Biography