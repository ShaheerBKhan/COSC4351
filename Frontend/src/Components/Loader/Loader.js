import { MutatingDots } from 'react-loader-spinner';

export const Loader = ({ loaderStyling }) => {
    console.log(loaderStyling)
    return (
        <MutatingDots
            height="100"
            width="100"
            color="#b9c29e"
            secondaryColor= '#b9c29e'
            radius='12.5'
            ariaLabel="mutating-dots-loading"
            wrapperStyle={loaderStyling}
            wrapperClass=""

            visible={true}
        />
    )
}
