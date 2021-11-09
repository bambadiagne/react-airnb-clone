import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCoins, faPlusCircle,faAt,faMale, faDollarSign, faPaperPlane, faLock, faUserClock, faUser, faBriefcase, faFemale } from '@fortawesome/fontawesome-free-solid';
import { connect } from "react-redux";
import TDatePicker from '../DatePicker/DatePicker';
import TenantService from '../../services/tenant/tenant-service';
import LandlordService from '../../services/landlord/landlord-service';
function Profile({ signUpDispatch, user }) {
    const dispatchAction = signUpDispatch;
    const [userBalance, setBalance] = useState(0)
    const [successful, setSuccessful] = useState({updateBalance:false,updateUser:false});
    const [birth_date, setStartDate] = useState(new Date());
    const [profile, setProfile] = useState(null);
    const [errorBalance,setErrorBalance]=useState(null);
    const [errors, setErrors] = useState({ errors: [] });
   
    const [currentUser, setCurrentUser] = useState({
        first_name: "",
        last_name: "",
        mail_address: "",
        birth_date: new Date(),
        username: "",
        password: "",

    });
    useEffect(() => {
        if (user.profile === "locataire") {
            TenantService.getSingleTenant(user.id).then((res) => {
                setCurrentUser(res);
            })

        }
        else {
            LandlordService.getSingleLandLord(user.id).then((res) => {
                setCurrentUser(res);
                console.log(res);
            })
        }
    }, [])
    const userData = {
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        mail_address: currentUser.mail_address,
        birth_date: new Date(),
        gender: currentUser.gender,
        confirmationPassword: null,
        username: currentUser.username,
        password: null,
        profile:user.profile,

    }
    const [updateUserData, setUserData] = useState(userData);
    const handleChange = e => {
        setUserData({ ...updateUserData, [e.target.id]: e.target.value });
    }
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    function validateuserData(update) {
        const errorsForm = [];
        const { first_name, last_name, confirmationPassword, mail_address, gender, password, profile, birth_date } = update;
        if (!gender) {
            errorsForm.push("Le genre est obligatoire")
        }

        if (!birth_date) {
            errorsForm.push("La date de naissance est obligatoire")
        }
        if (!first_name) {
            errorsForm.push("Le prenom est obligatoire")
        }
        if (!last_name) {
            errorsForm.push("Le nom est obligatoire")
        }
        if (!confirmationPassword) {
            errorsForm.push("la confirmation de mdp est obligatoire")
        }

        if (password !== confirmationPassword) {
            errorsForm.push("Les mots de passe ne correspondent pas")
        }
        if (!validateEmail(mail_address)) {
            errorsForm.push('Format email incorrecte')
        }
        if (!profile) {
            errorsForm.push('le profile est obligatoire ')
        }
        if (profile !== 'locataire' && profile !== 'locateur') {
            errorsForm.push('Profile Inconnu');
        }
        else {
            setProfile(profile)
        }
        setErrors({ ...errors, errors: errorsForm });
        return errorsForm.length === 0;
    }

    const handleSubmit = async e => {
        e.preventDefault();

        let user;

        if (validateuserData(updateUserData)) {

            setUserData({ ...updateUserData, birth_date: birth_date.toISOString().split('T')[0] })
            if (profile === "locataire") {
                console.log("bal", currentUser.balance);
                user = { ...updateUserData, balance:currentUser.balance,};
                try {
                    const res = await TenantService.UpdateSingleTenant(currentUser.id,user);
                    console.log('eere', res)
                    setSuccessful({...successful,updateUser:true});
                 
                }
                catch (err) {
                    console.log("erreur",err);
                    }
            }
            else {
                user = { ...updateUserData,benefits:currentUser.benefits };
                try {
                    const res = await LandlordService.UpdateSingleLandLord(currentUser.id,user);
                    console.log('eere', res)
                    setSuccessful({...successful,updateUser:true});
                 
                }
                catch (err) {
                    console.log("erreur",err);
                    }
            }
            

        }




    }

    const updateBalance =  e => {
        e.preventDefault();
        if(!userBalance){
            setErrorBalance("Solide invalide")
        }
        else{
            console.log('balanceCur',currentUser.balance);
            console.log('balance',userBalance);
            try
            {
            const newBalance=Number(currentUser.balance) + Number(userBalance);    
            const res=TenantService.UpdateSingleTenant(currentUser.id,{...currentUser,balance:newBalance});
            setCurrentUser({...currentUser,balance:newBalance})
            
            setSuccessful({...successful,updateBalance:true});

        }
            
            catch(err){
               setErrorBalance(err);
            }
        }
    }
    return <div>
        <h1 className='text-center text-white'>Page de profile</h1>
        <div className="d-flex flex-column flex-lg-row justify-content-around ">
            <div style={{backgroundColor: "#f2f3f7" }} >
                <h3 className=' rounded-lg border text-center'>Informations personnelles</h3>
                <br /><br />
                <div>
                    <h4 className="text-center" >Profile : <span>{user.profile}</span> </h4 >
                    <br /><br />
                    <div className="justify-content-center bg-white" >
                        <div className="input-container" >
                        <FontAwesomeIcon size="lg" icon={faUser} className="icon bg-primary" />

                        <label>Prenom : {currentUser.first_name}</label>
                        </div>
                        <div className="input-container">
                        <FontAwesomeIcon size="lg" icon={faUser} className="icon bg-primary" />

                        <label>Nom : {currentUser.last_name}</label>
                        </div>
                        <div className="input-container">
                        <FontAwesomeIcon size="lg" icon={faAt} className="icon bg-primary" />

                        <label>Pseudo : {currentUser.username}</label>
                        </div>
                        <div className="input-container">
                        <FontAwesomeIcon size="lg" icon={faEnvelope} className="icon bg-primary" />

                        <label>Mail : {currentUser.mail_address}</label>
                        </div>
                        <div className="input-container">
                        {currentUser.gender==="M"?<FontAwesomeIcon size="3x" icon={faMale} className="icon bg-primary" />:<FontAwesomeIcon size="lg" icon={faFemale} className="icon bg-primary" />}
                        <label>Sexe : {currentUser.gender}</label>
                        </div>
                    </div>
                    
                    
                    <div hidden={user.profile === "locateur"} className="center-block  card text-white bg-primary mb-3 justify-content-center" style={{ width: "80%" }} >
                    <div hidden={!successful.updateBalance} className="alert alert-success" role="alert">
                        Solde modifié avec succès !</div>
              
                    {errorBalance? <li className=''>{errorBalance}</li>:""}
                  

                        <div className="card-header"><FontAwesomeIcon icon={faCoins} size="lg" className="icon bg-primary " /> Solde </div>

                        <div className="card-body">
                            <h3>Solde : {currentUser.balance}$</h3>

                        </div>
                        <div>
                   
                            <form onSubmit={updateBalance}>

                                <div className="form-group input-container">
                                    <FontAwesomeIcon size="lg" icon={faDollarSign} className="icon bg-primary" />

                                    <input type="number" onChange={(e)=>setBalance(e.target.value)} id='balance' className="form-control input-field" name="balance" />

                                </div>
                                <div className="form-group ">

                                    <button type="submit" className="col-12 btn btn-primary btn-lg btn-block">
                                        Ajouter  <FontAwesomeIcon key={"plane2"} icon={faPlusCircle} /></button>

                                </div>

                            </form>
                        </div>
                    </div>
                    <div hidden={user.profile === "locataire"} className="center-block rounded-lg card text-white bg-primary mb-3 justify-content-center" style={{ width: "80%" }} >


                        <div className="card-header"><FontAwesomeIcon icon={faCoins} size="lg" className="icon bg-primary " /> Finances </div>

                        <div className="card-body">
                            <h3>Benefices : {currentUser.benefits}</h3>

                        </div>

                    </div>

                </div>
            </div>
            <div className="signup-form ">

                <form className="float-right" onSubmit={handleSubmit} ><br />
                    <ul>
                        {errors.errors.map((err) => <li key={err} className='text-danger'>{err}</li>)}
                    </ul>
                    <div hidden={!successful.updateUser} className="alert alert-success" role="alert">
                        Compte modifié avec succès !</div>
                    <h2>Informations personnelles</h2>

                    <div className="form-group">
                        <div className="row">

                            <div className="col input-container">
                                <FontAwesomeIcon icon={faUser} className="icon" />

                                <input   onChange={handleChange} type="text" id='first_name' className="form-control input-field" name="first_name" placeholder="Prenom" />

                            </div>

                            <div className="col input-container">
                                <FontAwesomeIcon icon={faUser} className="icon" />

                                <input type="text"  onChange={handleChange} id='last_name' className="form-control input-field" name="last_name" placeholder="Nom" />
                            </div>

                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">

                            <div className="col input-container">
                                <FontAwesomeIcon icon={faUser} className="icon" />

                                <input onChange={handleChange}  type="text" id='username' className="form-control input-field" name="username" placeholder="Pseudo" />

                            </div>
                        </div>
                    </div>

                    <div className="form-group input-container">
                        <FontAwesomeIcon icon={faEnvelope} className="icon" />
                        <input type="mail_address"  onChange={handleChange} id="mail_address" className="form-control input-field" name="email" placeholder="Email" />
                    </div>
                    <label htmlFor="date">Date de naissance</label>
                    <div className="form-group input-container">

                        <FontAwesomeIcon icon={faUserClock} className="icon" />

                        <TDatePicker selected={birth_date} setStartDate={setStartDate} className="form-control " />
                    </div>

                    <div className="form-group input-container">
                        <FontAwesomeIcon icon={faLock} className="icon" />

                        <input type="password"  onChange={handleChange} id='password' className="form-control input-field" name="password" placeholder="Mot de passe" />
                    </div>

                    <div className="form-group input-container">
                        <FontAwesomeIcon icon={faLock} className="icon" />

                        <input type="password" onChange={handleChange} id='confirmationPassword' className="form-control input-field" name="confirmationPassword" placeholder="Confirmation Mot de passe" />
                    </div>
                    <div className="form-group input-container">
                        <FontAwesomeIcon icon={faBriefcase} className="icon" />
                        <select id='gender' onChange={handleChange} className="form-select" aria-label="Sexe">
                            <option >Sexe</option>
                            <option value="M">M</option>
                            <option value="F">F</option>
                        </select>
                    </div>


                    <div className="form-group ">

                        <button type="submit" className="col-12 btn btn-primary btn-lg btn-block">  <FontAwesomeIcon key={"plane1"} icon={faPaperPlane} style={{ "float": 'left' }} />
                            Modifier profile  <FontAwesomeIcon key={"plane2"} icon={faPaperPlane} style={{ "float": 'right' }} /></button>

                    </div>
                </form>

            </div>
        </div>

    </div>

}

function mapStateToProps(state) {

    return {
        user: state.auth.user,
    };
}

function mapDispatchToProps(dispatch) {
    return { signUpDispatch: (action) => dispatch(action) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
