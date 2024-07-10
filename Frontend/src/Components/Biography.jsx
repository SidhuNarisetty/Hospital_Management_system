import React from "react";

const Biography = ({imageUrl}) => {
    return (
        <div className="container biography">
            <div className="banner">
                <img src={imageUrl} alt="aboutImg"/>
            </div>
            <div className="banner">
                <p>Biography</p>
                <h3>Who we are</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus cumque placeat voluptatibus sit fugiat ut numquam ratione asperiores nisi. Est, laboriosam nesciunt consectetur, obcaecati corrupti magnam numquam enim dolorem consequuntur quia in deserunt sequi unde. Velit quas debitis saepe ad nam minus, impedit veniam numquam iusto recusandae provident deleniti cupiditate!
                </p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <p>
                    Lorem ipsum dolor sit amet.
                </p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo magnam cumque esse, ratione repellendus beatae laborum, incidunt et eligendi aspernatur cum accusamus molestias ut officia quod minus consectetur repellat! Adipisci explicabo blanditiis aspernatur aut nemo.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, voluptas?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil distinctio maiores deserunt.</p>
            </div>
        </div>
    );
}

export default Biography;