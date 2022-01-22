import styled from 'styled-components'

// input
export const InputComment = styled.input`
    margin: 10px 5px;
    padding: 5px 15px;
    font-size: 20px;  
    font-weight: bold;
    border-radius: 4px;

    width: 400px;
    height: 30px;
`

export const InputBlog = styled.input`
    margin: 10px 5px;
    padding: 5px 15px;
    font-size: 20px;  
    font-weight: bold;
    border-radius: 4px;
    
    width: 350px;
    height: 40px;
`

export const InputLogin = styled.input`
    margin: 10px 5px;
    padding: 5px 15px;
    font-size: 20px;  
    font-weight: bold;
    border-radius: 4px;
    
    width: 250px;
    height: 40px;
`

// button
export const Button = styled.button`
    font-size: 15px;
    background: olivedrab;
    color: #242936;
    font-weight: bold;
    padding: 10px 10px;
    border: none;
    border-radius: 4px;
    font-family: "Roboto", "Lucida Grande", Verdana, Arial, sans-serif; 
  
    &:hover {
        transform: translate(0,-5px);
        box-shadow: 0px 15px 30px #010101;
        cursor: pointer;
    }
`

export const FormButton = styled.button`
    background: olivedrab;
    font-weight: bold;
    padding: 10px 10px;
    border: none;
    border-radius: 4px;
    font-family: "Roboto", "Lucida Grande", Verdana, Arial, sans-serif; 
  
    &:hover {
        transform: translate(0,-5px);
        box-shadow: 0px 15px 30px #010101;
        cursor: pointer;
    }

    margin-left: 210px;
    margin-top: 15px;
    font-size: 15px;
    color: #242936;
`

export const FormButtonSecond = styled.button`
    background: olivedrab;
    font-weight: bold;
    padding: 10px 10px;
    border: none;
    border-radius: 4px;
    font-family: "Roboto", "Lucida Grande", Verdana, Arial, sans-serif; 
  
    &:hover {
        transform: translate(0,-5px);
        box-shadow: 0px 15px 30px #010101;
        cursor: pointer;
    }

    margin-left: 30px;
    margin-top: 15px;
    font-size: 15px;
    color: #242936;
`

export const SingleBlogButton = styled.button`
    font-size: 15px;
    background: #242936;
    color: olivedrab;
    font-weight: bold;
    padding: 10px 10px;
    border: none;
    border-radius: 4px;
    font-family: "Roboto", "Lucida Grande", Verdana, Arial, sans-serif; 
  
    &:hover {
        transform: translate(0,-5px);
        box-shadow: 0px 15px 30px #010101;
        cursor: pointer;
    }
`

// div
export const GreenDiv = styled.div`
    margin: auto;
    width: 98%;   
    padding: 20px;
    overflow: hidden;
    border-radius: 4px;
    font-size: 20px;
    font-weight: bold;

    color: #191e2a;
    background-color: olivedrab; 
`

export const SingleBlogComment = styled.div`
    margin: auto;
    width: 98%;   
    padding: 20px;
    overflow: hidden;
    border-radius: 4px;
    font-size: 20px;
    font-weight: bold;

    color: olivedrab;
    background-color: #191e2a; 
`

export const NavDiv = styled.div`
    width: 100%;
    height: 100px;
    
    background-color: #191e2a;
    box-shadow: 0px 3px 10px #010101;
    color:olivedrab;
  
    /* to set navigation-bar as the fixed bar, so when the screen is scroolled down, it is always staying on the top. */
    position: fixed;
    left: 0px;
    top:0px;
  
    z-index: 8;
`

export const NavAppDiv = styled.div`
    height: 50px;
    margin: 0 5px;
    float: left;
`

export const NavDivLink = styled.div`
    height: 50px;
    margin: 0 5px;
    float: left;

    font-size: 15px;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;

    & .link {
        text-decoration: none;
        font-weight: bold;
        color: #242936;
        background: olivedrab;
        padding-top: 3px;
        font-size: 15px;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 10px;
    }
    
    &:hover .link {
        transform: translate(0,-5px);
        box-shadow: 0px 15px 30px #010101;
        cursor: pointer;
    }
`

export const BodyFirstDiv = styled.div`
    width: 100%;
    /* the margin-top value is the height of navigator-bar: 100px + its box-shadow size: 3px + 10px = 113px, then add 7px more for it. */
    margin: 120px auto 0 auto; 
    background-color: #1f2430;

    padding-top: 20px;
    overflow: hidden;
    border-radius: 4px;

    color: #afafaf;
`

export const HomeBodyDiv = styled.div`
    margin: 0px 20px; 
`

export const ClearBothDiv = styled.div`
    clear: both;
`


export const BlogListDiv = styled.div`
    font-size: 15px;
    border-radius: 5px;
    padding: 10px;
    margin: 20px;

    & .link {
        text-decoration: none;
        font-weight: bold;
        color: #242936;
        background: olivedrab;
        padding-top: 3px;
        font-size: 15px;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 10px;
    }
    
    &:hover .link {
        transform: translate(0,-5px);
        box-shadow: 0px 15px 30px #010101;
        cursor: pointer;
    }
`
export const BlogFormDiv = styled.div`
    position: absolute;
    left: 50px;
    top:30px;
    
    width: 400px;
    height: 300px;
`

export const BlogFormOuterDiv = styled.div`
    position:fixed;
    top: 50%;
    left: 50%;
    margin-top: -250px;
    margin-left: -250px;
    border: none;
    border-radius: 10px;
    padding: 0;

    background: #242936;
    box-shadow: 0px 3px 10px #010101;

    width: 500px;
    height: 450px;
`

export const FormDiv = styled.div`    
    width: 100%;
    position: relative;
`

export const LoginFormInnerDiv = styled.div`
    position: absolute;
    left: 50px;
    top:30px;
    
    width: 300px;
    height: 150px;
`

export const LoginFormOuterDiv = styled.div`
    position:fixed;
    top: 50%;
    left: 50%;
    margin-top: -250px;
    margin-left: -250px;
    border: none;
    border-radius: 10px;
    padding: 0;

    background: #242936;
    box-shadow: 0px 3px 10px #010101;

    width: 400px;
    height: 400px;
`


export const FormHeadDiv = styled.div`
    border: none;
    border-radius: 10px 10px 0px 0px;
    margin: 0 0;
    padding: 20px 20px;
    width: auto;
    height: auto;

    display: flex;
    justify-content: center;

    background: olivedrab;
    color: #242936;
    text-transform: uppercase;
`

export const NavigationLeftDiv = styled.div`
    width: 60%;
    height: 100px;
    line-height: 50px;
    float: left;
    min-width: 450px;  
    padding: 30px 0px;
`

export const NavigationRightDiv = styled.div`
    width: 39%;
    height: 100px;
    line-height: 50px;  
    float: left;
    /* border: 1px solid red; */
    min-width: 250px;
    padding: 30px 0px;
`

export const NavigationRightBtnDiv = styled.div`
    margin: 0 5px;
    height: 50px;
    float: right;
`

export const NavigationRightUserDiv = styled.div`
    margin: 0 15px;
    height: 50px;
    font-weight: bold;
    text-transform: uppercase; 
    float: right;
`

// a
export const BlogDivLink = styled.a`    
    text-decoration: none;
    font-weight: bold;
    color: #010101;
    padding-top: 3px;
    font-size: 15px;
    border-radius: 5px;
    margin: 0 15px 0 0;    
    
    &:hover {
        transform: translate(0,-5px);
        box-shadow: 0px 15px 30px #010101;
        cursor: pointer;
    }
`


// li
export const UserBlogList = styled.li`
    margin: 30px 0px;

    & .link {
        text-decoration: none;
        font-weight: bold;
        color: #242936;
        background: olivedrab;
        padding-top: 3px;
        font-size: 15px;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 10px;
    }
    
    &:hover .link {
        transform: translate(0,-5px);
        box-shadow: 0px 15px 30px #010101;
        cursor: pointer;
    }
`



// h1
export const NavigationHead = styled.h1`
    height: 50px;
    margin: 0 30px 0 5px;
    float: left;
`

// h2
export const HeadTwo = styled.h2`
    color: olivedrab;
`




// table
export const UserTable = styled.table`
    border: none;
    margin: 30px;
    background: olivedrab;
`

// td
export const UserListTd = styled.td`
    height: 50px;
    font-size: 15px;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;

    & .link {
        text-decoration: none;
        font-weight: bold;
        color: #242936;
        background: olivedrab;
        padding-top: 3px;
        font-size: 15px;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 10px;
    }
    
    &:hover .link {
        transform: translate(0,-5px);
        box-shadow: 0px 15px 30px #010101;
        cursor: pointer;
    }
`
// th
export const HeadTwoTh = styled.th`
    color: olivedrab;
    border: none;
    padding: 10px;
    background: #1f2430;
`