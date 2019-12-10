import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
// ----------------------------------- added by ftf -----------------------------------
import Select from 'react-select';
import ToggleButton from 'react-toggle-button';
// ----------------------------------- end by ftf -----------------------------------

const Register = ({ facade, logInState }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [favAirport, setFavAirport] = useState("");
    const [redirect, setRedirect] = useState(false);

    // ----------------------------------- added by ftf -----------------------------------

    const [step, setStep] = useState(1);
    const [confirm_password, setConfirm_password] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const options = [
        { value: 'BMA-sky', label: 'BMA' },
        { value: 'STOC-sky', label: 'STO' },
        { value: 'ARN-sky', label: 'ARN' },
        { value: 'NYO-sky', label: 'NYO' },
        { value: 'VST-sky', label: 'VST' },
      ];
    const [activeGame1, setActiveGame1] = useState(false);
    const [activeGame2, setActiveGame2] = useState(false);
    const [activeGame3, setActiveGame3] = useState(false);
    const [activeGame4, setActiveGame4] = useState(false);

    // Go to the next step
    const nextStep = (e) => {
        if(username==="" || password==="" || password !== confirm_password) {
            alert("Please check the input fields!");
            return;
        } else {
            setStep(step + 1);
        }
    }

    // Go to the prev step
    const prevStep = (e) => {
        setStep(step - 1);
    }

    // Go to the skip step
    const skipStep = (e) => {
        if(step===3){
            onSubmit();
        } else {
            setStep(step + 1);
        }        
    }

    //Select option
    const selectedhandleChange = (selectedOption) => {
        console.log(selectedOption);
        selectedOption = selectedOption;
        setSelectedOption(selectedOption);
    }

    // Toggle of game1
    const game1 = (activeGame1) => {
        if(activeGame1){
            setActiveGame1(false);
        } else {
            setActiveGame1(true);
        }
        
    }
    // Toggle of game2
    const game2 = (activeGame2) => {
        if(activeGame2){
            setActiveGame2(false);
        } else {
            setActiveGame2(true);
        }
        
    }
    // Toggle of game3
    const game3 = (activeGame3) => {
        if(activeGame3){
            setActiveGame3(false);
        } else {
            setActiveGame3(true);
        }
        
    }
    // Toggle of game4
    const game4 = (activeGame4) => {
        if(activeGame4){
            setActiveGame4(false);
        } else {
            setActiveGame4(true);
        }
        
    }

    


    // ----------------------------------- end by ftf -----------------------------------

    const onSubmit = (e) => {
        // e.preventDefault();

        // if(username === "" || password === "") {
        //     return;
        // } 

        facade.register(username, password, favAirport)
            .then(data => {
                alert("Brugernavn '" + data.username + "' oprettet!");
                logInState(data.roles, username);
                setRedirect(true);
            })
            .catch(err => {
                alert("Something went wrong!");
            });
    }

    const onChange = (e) => {
        if (e.target.id === "uname") {
            setUsername(e.target.value);
        } else if (e.target.id === "pword") {
            setPassword(e.target.value);
        } else if (e.target.id === "cword") {
            setConfirm_password(e.target.value);
        } else {
            setFavAirport(e.target.value);
        }
    }

    if (redirect) {
        return <Redirect to="/user" />
    }

    // -------------------------- added by ftf -----------------------------------

    switch (step) {
        case 2:
                return (
                    <div className="container container-small">
                        <div className="data-wrapper">
                            <div className='height60'></div>
                                <h2 className="align-center">Register</h2>
                                <div className="align-center">
                                    <div className='define-step'>
                                        <img src="/assets/line.png" width="100%"/>
                                    </div>
                                    <div className='define-step'>
                                        <h5 className="padding-top20">Step {step}</h5>
                                    </div>
                                    <div className='define-step'>
                                        <img src="/assets/line.png" width="100%" />
                                    </div>
                                </div><br/><br/><br/><br/>
                                <div className="form-register" onChange={onChange} >
                                    <div className="box">
                                        <Select
                                            value={selectedOption}
                                            onChange={selectedhandleChange}
                                            options={options}
                                            placeholder='Choose airport'
                                        />            
                                    </div><br/><br/>
                                    <div className="align-center">
                                        <button className="btn btn-primary prev-button" type='button' onClick={prevStep}>Prev</button>
                                        <button className="btn btn-warning skip-button" type='button' onClick={skipStep}>Skip</button>
                                        <button className="btn btn-primary next-button" type='button' onClick={nextStep}>Next</button>
                                    </div>
                                </div>
                          
                        </div>
                    </div>
                )
            break;
        case 3: 
            return (
                <div className="container container-small">
                            <div className="data-wrapper">
                                <div className='height60'></div>
                                    <h2 className="align-center">Register</h2>
                                    <div className="align-center">
                                        <div className='define-step'>
                                            <img src="/assets/line.png" width="100%"/>
                                        </div>
                                        <div className='define-step'>
                                            <h5 className="padding-top20">Step {step}</h5>
                                        </div>
                                        <div className='define-step'>
                                            <img src="/assets/line.png" width="100%" />
                                        </div>
                                    </div><br />
                                    <div className="form-register">
                                        <br/><br/>
                                        <div className="align-center">
                                            <div className="padding30">
                                                <div className="game-title"><h6>PES2020: </h6></div>
                                                <div className="game-check">
                                                    <ToggleButton
                                                        inactiveLabel={'Off'}
                                                        activeLabel={'Active'}
                                                        colors={{
                                                        activeThumb: {
                                                            base: 'rgb(250,250,250)',
                                                        },
                                                        inactiveThumb: {
                                                            base: 'rgb(62,130,247)',
                                                        },
                                                        active: {
                                                            base: 'rgb(207,221,245)',
                                                            hover: 'rgb(177, 191, 215)',
                                                        },
                                                        inactive: {
                                                            base: 'rgb(65,66,68)',
                                                            hover: 'rgb(95,96,98)',
                                                        }
                                                        }}
                                                        value={activeGame1}
                                                        onToggle={game1}
                                                    />
                                                </div>
                                            </div>
                                        </div><br className="clear-floats"/><br/>
                                        <div className="align-center">
                                            <div className="padding30">
                                                <div className="game-title"><h6>FIFA2020: </h6></div>
                                                <div className="game-check">
                                                    <ToggleButton
                                                        inactiveLabel={'Off'}
                                                        activeLabel={'Active'}
                                                        colors={{
                                                        activeThumb: {
                                                            base: 'rgb(250,20,250)',
                                                        },
                                                        inactiveThumb: {
                                                            base: 'rgb(62,10,247)',
                                                        },
                                                        active: {
                                                            base: 'rgb(207,21,245)',
                                                            hover: 'rgb(177, 11, 215)',
                                                        },
                                                        inactive: {
                                                            base: 'rgb(65,6,68)',
                                                            hover: 'rgb(95,6,98)',
                                                        }
                                                        }}
                                                        value={activeGame2}
                                                        onToggle={game2}
                                                    />
                                                </div>
                                            </div>
                                        </div><br className="clear-floats"/><br/>
                                        <div className="align-center">
                                            <div className="padding30">
                                                <div className="game-title"><h6>DOTA2.0: </h6></div>
                                                <div className="game-check">
                                                    <ToggleButton
                                                        inactiveLabel={'Off'}
                                                        activeLabel={'Active'}
                                                        colors={{
                                                        activeThumb: {
                                                            base: 'rgb(25,250,250)',
                                                        },
                                                        inactiveThumb: {
                                                            base: 'rgb(6,130,247)',
                                                        },
                                                        active: {
                                                            base: 'rgb(7,221,245)',
                                                            hover: 'rgb(77, 191, 215)',
                                                        },
                                                        inactive: {
                                                            base: 'rgb(95,66,68)',
                                                            hover: 'rgb(95,96,98)',
                                                        }
                                                        }}
                                                        value={activeGame3}
                                                        onToggle={game3}
                                                    />
                                                </div>
                                            </div>
                                        </div><br className="clear-floats"/><br/>
                                        <div className="align-center">
                                            <div className="padding30">
                                                <div className="game-title"><h6>CS2.0: </h6></div>
                                                <div className="game-check">
                                                    <ToggleButton
                                                        inactiveLabel={'Off'}
                                                        activeLabel={'Active'}
                                                        // colors={{
                                                        // activeThumb: {
                                                        //     base: 'rgb(250,250,250)',
                                                        // },
                                                        // inactiveThumb: {
                                                        //     base: 'rgb(62,130,247)',
                                                        // },
                                                        // active: {
                                                        //     base: 'rgb(207,221,245)',
                                                        //     hover: 'rgb(177, 191, 215)',
                                                        // },
                                                        // inactive: {
                                                        //     base: 'rgb(65,66,68)',
                                                        //     hover: 'rgb(95,96,98)',
                                                        // }
                                                        // }}
                                                        value={activeGame4}
                                                        onToggle={game4}
                                                    />
                                                </div>
                                            </div>
                                        </div><br className="clear-floats"/><br/><br/>
                                        <div className="align-center">
                                            <button className="btn btn-primary prev-button" type='button' onClick={prevStep}>Prev</button>
                                            <button className="btn btn-warning skip-button" type='button' onClick={skipStep}>Skip</button>
                                            <button className="btn btn-success next-button" type='button' onClick={onSubmit}>Register</button>
                                        </div>
                                    </div>
                            
                            </div>
                        </div>
            )
        break;    
        default:
                return (
                    <div className="container container-small">
                        <div className="data-wrapper">
                            <div className='height60'></div>
                                <h2 className="align-center">Register</h2>
                                <div className="align-center">
                                    <div className='define-step'>
                                        <img src="/assets/line.png" width="100%"/>
                                    </div>
                                    <div className='define-step'>
                                        <h5 className="padding-top20">Step {step}</h5>
                                    </div>
                                    <div className='define-step'>
                                        <img src="/assets/line.png" width="100%" />
                                    </div>
                                </div><br />
                                <div className="form-register" onChange={onChange}>
                                    <div className="form form-group">
                                        <input className="form-control" placeholder="Username" id="uname" value={username}/>
                                    </div><br/>
                                    <div className="form-group">
                                        <input className="form-control" type="password" placeholder="Password" id="pword" value={password}/> <br />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" type="password" placeholder="Confirm Password" id="cword" value={confirm_password}/> <br />
                                    </div>
                                    <div>
                                        <button className="btn btn-primary next-button" type="button" onClick={nextStep}>Next</button>
                                    </div>
                                    <div>
                                        
                                    </div>
                                </div>
                          
                        </div>
                    </div>
                )
            break;
    }

    // --------------------- end by ftf ----------------------------

    // return (
    //     <div className="container container-small">
    //         <div className="data-wrapper">
    //             <h2>Register</h2><br />
    //             <form className="form-register" onSubmit={onSubmit} onChange={onChange} >
    //                 <div className="form form-group">
    //                     <input className="form-control" placeholder="Username" id="uname" />
    //                 </div><div className="form-group">
    //                     <input className="form-control" type="password" placeholder="Password" id="pword" /> <br />
    //                 </div>
                    // <div>
                    //     <select name="airport" form="register">
                    //         <option value="">Choose airport</option>
                    //         <option value="BMA-sky">BMA</option>
                    //         <option value="STOC-sky">STO</option>
                    //         <option value="ARN-sky">ARN</option>
                    //         <option value="NYO-sky">NYO</option>
                    //         <option value="VST-sky">VST</option>
                    //     </select>
                    //     <button className="btn btn-primary">Register</button>
                    // </div>
    //                 <div>
                        
    //                 </div>
    //             </form>
    //         </div>
    //     </div>
    // )
}

export default Register;