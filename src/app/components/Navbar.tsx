"use client"
// interface Props {
//     name: string,


// }

export default function Navbar(props: any) {
    const { handleClick } = props
    return (
        <div style={{ height: '2rem', padding: '10px 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'yellowgreen', position: 'fixed', top: '0', left: '0', width: 'calc(100% - 10px)', zIndex: 10 }}>
            <h3>Unplex.Me</h3>
            <button style={{}} onClick={handleClick}>Save</button>
        </div>
    )
}