import User from '../models/user.model'
import bcrypt from 'bcryptjs';

const usersSerializer = data => ({
    id: data.id,
    name: data.name,
    email: data.email,
    register_date: data.register_date,
    role: data.role,
    add_permission: data.add_permission,
    view_permission: data.view_permission,
    update_permission: data.update_permission,
    delete_permission: data.delete_permission,
    add_site: data.add_site,
    view_site: data.view_site,
    update_site: data.update_site,
    delete_site: data.delete_site,
    add_industry: data.add_industry,
    view_industry: data.view_industry,
    update_industry: data.update_industry,
    delete_industry: data.delete_industry,
    add_technology: data.add_technology,
    view_technology: data.view_technology,
    update_technology: data.update_technology,
    delete_technology: data.delete_technology,
    add_features: data.add_features,
    view_features: data.view_features,
    update_features: data.update_features,
    delete_features: data.delete_features,
    add_portfolio: data.add_portfolio,
    view_portfolio: data.view_portfolio,
    update_portfolio: data.update_portfolio,
    delete_portfolio: data.delete_portfolio,
    site: data.site,
    industry: data.industry,
    technology: data.technology,
    features: data.features,
    portfolio: data.portfolio
});

// Retrieve all data
exports.findAll =  (req, res) => {
    User.find()
    .then(async data => {
        const users = await Promise.all(data.map(usersSerializer));
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Retrieve data with pagination
exports.findPagination = async (req, res) => {
    const { page = 1, limit = 5, name = "", email = "" } = req.query;

    let query = {}
    if (email && email !== "null") {
        query =  { email : new RegExp(`${email}+`, "i") }
        
        if (name && name !== "null") {
            query = {
                $or: [ { email : new RegExp(`${email}+`, "i") } , { name: new RegExp(`${name}+`, "i") } ]
            }
        }
    }
    else if (name && name !== "null") {
        query = { name: new RegExp(`${name}+`, "i") }
    }

    const paginated = await User.paginate(
        query,
        {
            page,
            limit,
            lean: true,
            sort: { updatedAt: "desc" }
        }
    )
    
    const { docs } = paginated;
    const users = await Promise.all(docs.map(usersSerializer));
    
    delete paginated["docs"];
    const meta = paginated

    res.json({ meta, users });
};

exports.findOne = (req, res) => {
    User.findById(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });
            }
            const user = usersSerializer(data)
            res.send(user);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.id
            });
        });
};

exports.create = async (req, res) => {
    if(!req.body.name || !req.body.email || !req.body.password || !req.body.role) {
         return res.status(400).send({
             message: "Name, Email , role and Password can not be empty"
         });
    }

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(req.body.password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');

      
    const user = new User({
        name: req.body.name.trim(),
        email: req.body.email.trim(),
        password: hash,
        role: req.body.role.trim(),
       
    });
   
   await user.save()
    .then(data => {
        const user = usersSerializer(data)
        res.send(user);
    })
.catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

exports.update = (req, res) => {
    if(!req.body.name || !req.body.email ) {
        return res.status(400).send({
            message: "Name and Email can not be empty"
        });
    }

    User.findByIdAndUpdate(req.params.id, {
        name: req.body.name.trim(),
        email: req.body.email.trim(),
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        const user = usersSerializer(data)
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.id
        });
    });
};

 //permissions
exports.permissions = (req, res) => {
      
    User.findByIdAndUpdate(req.params.id, {
        add_permission: req.body.add_permission,
        view_permission: req.body.view_permission,
        update_permission: req.body.update_permission,
        delete_permission: req.body.delete_permission,
        // module permission
        add_site: req.body.add_site,
        view_site: req.body.view_site,
        update_site: req.body.update_site,
        delete_site: req.body.delete_site,
        add_technology: req.body.add_technology,
        view_technology: req.body.view_technology,
        update_technology: req.body.update_technology,
        delete_technology: req.body.delete_technology,
        add_industry: req.body.add_industry,
        view_industry: req.body.view_industry,
        update_industry: req.body.update_industry,
        delete_industry: req.body.delete_industry,
        add_features: req.body.add_features,
        view_features: req.body.view_features,
        update_features: req.body.update_features,
        delete_features: req.body.delete_features,
        add_portfolio: req.body.add_portfolio,
        view_portfolio: req.body.view_portfolio,
        update_portfolio: req.body.update_portfolio,
        delete_portfolio: req.body.delete_portfolio,
        site: req.body.site,
        industry: req.body.industry,
        technology: req.body.technology,
        features: req.body.features,
        portfolio: req.body.portfolio
    }, {new: true})
    .then(data => {
        return res.status(200).send({
            msg: " Permissions Updated Successfully! "
        });

        if(!data) {
            return res.status(404).send({
                msg: "User not found with id " + req.params.id
            });
        }
        const user = usersSerializer(data)
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                msg: "User not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.id
        });
    });
};

// exports.view_permission = (req, res) => {

//     User.findByIdAndUpdate(req.params.id, {
//         view_permission: req.body.view_permission,
//     }, {new: true})
//     .then(data => {
//         if(!data) {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.id
//             });
//         }
//         const user = usersSerializer(data)
//         res.send(user);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.id
//             });
//         }
//         return res.status(500).send({
//             message: "Error updating user with id " + req.params.id
//         });
//     });
// };

// exports.update_permission = (req, res) => {

//     User.findByIdAndUpdate(req.params.id, {
//         update_permission: req.body.update_permission,
//     }, {new: true})
//     .then(data => {
//         if(!data) {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.id
//             });
//         }
//         const user = usersSerializer(data)
//         res.send(user);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.id
//             });
//         }
//         return res.status(500).send({
//             message: "Error updating user with id " + req.params.id
//         });
//     });
// };

// exports.delete_permission = (req, res) => {

//     User.findByIdAndUpdate(req.params.id, {
//         delete_permission: req.body.delete_permission,
//     }, {new: true})
//     .then(data => {
//         if(!data) {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.id
//             });
//         }
//         const user = usersSerializer(data)
//         res.send(user);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.id
//             });
//         }
//         return res.status(500).send({
//             message: "Error updating user with id " + req.params.id
//         });
//     });
// };

exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.id)
     .then(user => {
         if(!user) {
             return res.status(404).send({
                 message: "User not found with id " + req.params.id
             });
         }
         res.send({ id: req.params.id, message: "User deleted successfully!" });
     }).catch(err => {
         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
             return res.status(404).send({
                 message: "User not found with id " + req.params.id
             });
         }
         return res.status(500).send({
             message: "Could not delete user with id " + req.params.id
         });
     });
};

//module
exports.module = (req, res) => {

    User.findByIdAndUpdate(req.params.id, {
        add_module: req.body.add_module,
        view_module: req.body.view_module,
        update_module: req.body.update_module,
        delete_module: req.body.delete_module
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        const user = usersSerializer(data)
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.id
        });
    });
};