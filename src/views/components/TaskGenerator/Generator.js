import {Task} from "../Task";

export function Generator(r) {
    return r.map(item => {
            return(
                <div className="w-80 break-words">
                    <Task name={item.title} description={item.description}/>
                </div>
            )
    })
}