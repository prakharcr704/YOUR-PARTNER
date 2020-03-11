const db = require('../util/database');

module.exports = class User {
    constructor(memberId,firstName,lastName,emailId,mobileNo,ageDate,ageMonth,ageYear,gender) {
        this.memberId = memberId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId;
        this.mobileNo = mobileNo;
        this.ageDate = ageDate;
        this.ageMonth = ageMonth
        this.ageYear = ageYear;
        this.gender = gender;
    }
    static login(username,password){
        let  memberId;
        return db.execute("select memberID from credentials where  EmailID = '"+username+"' and '"+password+"'=password")
            .then(result=>{
                memberId = result[0];
                if(memberId.length === 1){
                    return db.execute("select Occupation from fullyregistered where MemberID = " + memberId[0].memberID)
                        .then(([result,tableDef])=>{
                            if(result.length==0){
                                return 'logInButCompleteTheProfileFirst';
                            }else{
                                return 'logIn';
                            }
                        })
                        .catch(err => console.log(err));
                }
                else
                    return 'IncorrectCredentials';
            })
            .catch(err => console.log(err));
    }

    static delete(username){
        return db.execute('delete from credentials where EmailID = "'+username+'"');
    }

    static edit(username){
        return db.execute('select * ' +
            'from onlyregistered o,fullyregistered f' +
            ' where o.MemberID = f.MemberID ' +
            "and o.EmailID = '" + username+"'")
            .then(([result,tableDef])=>{
                return result;
            })
            .catch(err => console.log(err));
    }

    static GetNewUserData(username){
        return db.execute('select * ' +
            'from onlyregistered ' +
            ' where EmailID = '+"'" + username+"'")
            .then(([result,tableDef])=>{
                return result;
            })
            .catch(err => console.log(err));
    }

    static update(email,obj,option) {
        console.log(obj);
    }
};
/*db.execute('update fullyregistered set ' +
            'Occupation = ?' +
            'Citizenship = ? ' +
            'Address = ? ' +
            'Income = ? ' +
            'City = ? ' +
            'Age = ? ' +
            'Interest = ? ' +
            'AboutMySelf = ? ' +
            'Complexion = ? ' +
            'Smoke = ? ' +
            'Drink = ? ' +
            'Weight = ? ' +
            'Height = ? ' +
            'Expectations = ? ' +
            'MotherTongue = ? ' +
            'Religion = ? ' +
            'MartialStatus = ? ' +
            'ChildrenStatus = ? ' +
            'HigherEducation = ? ' +
            'SecondaryEducation = ? ' +
            'CollegeDegree = ? ' +
            'FatherOccupation = ? ' +
            'MotherOccupation = ? ' +
            'Brothers = ? ' +
            'Sisters = ? ' +
            'FamilyType = ?',)
    }*/
