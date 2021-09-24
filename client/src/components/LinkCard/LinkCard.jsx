import React from "react";

export const LinkCard = ({ link }) => {

    return (
        <>
            <h2>Link</h2>

            <p>
                Shorted link: 
                <a href={link.to} target="_blank" rel="noopener noreferrer"></a>
                {link.to}
            </p> 

            <p>
                From: 
                <a href={link.from} target="_blank" rel="noopener noreferrer"></a>
                {link.from}
            </p>    

            <p>
                Count of clicks on link: 
                <strong>{link.clicks}</strong>
            </p>

            <p>
                Creating date: <strong>{new Date(link.date).toLocaleDateString()}</strong>
            </p>
        </>
    );
}