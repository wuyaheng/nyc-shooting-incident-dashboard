import React from "react";


function TextBox(props) {
    const obj = {"true": 0, "false": 0};
    props.results.forEach((ele) => {
        console.log(ele['statistical_murder_flag'])
        if (ele['statistical_murder_flag']===true) {
            obj["true"]++
        } else {
            obj["false"]++
        }
      });

      console.log(obj)
  return (
        <div className="card mb-1">
             <div className="card-content pb-1">
          <p className="text-center">Shooting Resulted in the Victim’s Death</p>

          <h4 className="text-center" style={{color: "#cc8b86", fontWeight: 700}}>{obj["true"]}</h4>

        </div>
        </div>
  );
}

export default TextBox;