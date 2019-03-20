import React, { Component } from 'react';

import './Profile.less';

import { Avatar} from 'antd';

import {AuthConsumer} from "../AuthContext";


class Profile extends Component {

    render() {

        return (
            <AuthConsumer>
                { ({currentUser ,handleLogout})=>
                    <div className="profile">
                                <div className="user-profile">
                                    <div className="user-details">
                                        {/*                                <div className="user-avatar">
                                    <Avatar className="user-avatar-circle" style={{
backgroundColor: getAvatarColor(this.state.user.name)}}>
                                        {this.state.user.name[0].toUpperCase()}
                                    </Avatar>
                                </div>*/}
                                        <div className="user-summary">
                                            <div className="full-name">{currentUser.name}</div>
                                            <div className="username">@{currentUser.username}</div>
                                            <div className="user-joined">
                                                {currentUser.id}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                        <span  style={{color:"blue",cursor: "pointer"}} onClick={handleLogout}> logout </span>
                    </div>
                }
            </AuthConsumer>
        );
    }
}

export default Profile;