export default function PageHeaders({
    h1Text = 'Hello',
    h2Text = 'Subheader',
}){
    return(
        <section className="text-center mt-12 sm:mt-24 mb-4 sm:mb-8">
            <h1 className="text-xl sm:text-3xl" style={{textShadow: '1px 1px 0 rgba(0,0,0,.2)'}}>
            {h1Text}
            </h1>
            
       

        </section>

    )
}