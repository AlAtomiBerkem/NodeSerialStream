import React from 'react';
import './style.css';

const GetUsers = ({ users = [] }) => {
    return (
        <div className='user-list'>
            <h4>Список пользователей</h4>
            {users.length > 0 ? (
                <div className='user-grid'>
                    {users.map((user) => (
                        <div key={user._id} className='user-item'>
                            <div className='user-info'>
                                <div className='user-header'>
                                    <h5>Информация о пользователе</h5>
                                </div>
                                <div className='user-details'>
                                    <span className='user-name'>Имя: {user.UserName}</span>
                                    <span className='user-idtab'>ID планшета: {user.idTab}</span>
                                    <span className='user-id'>Сгенерированный userID: {user.generateID}</span>
                                </div>
                                <div className='user-header'>
                                    <h5>Результаты проверки комнат</h5>
                                </div>
                                <div className='user-rooms'>
                                    <span className='user-room'>Комната 1: {user.checkingRoomOne.filter(Boolean).length} пройдено стендов из {user.checkingRoomOne.length}</span>
                                    <span className='user-room'>Комната 2: {user.checkingRoomTwo.filter(Boolean).length} пройдено стендов из {user.checkingRoomTwo.length}</span>
                                    <span className='user-room'>Комната 3: {user.checkingRoomThree.filter(Boolean).length} пройдено стендов из {user.checkingRoomThree.length}</span>
                                </div>
                                <div className='user-header'>
                                    <h5>Результаты теста</h5>
                                </div>
                                <div className='user-results'>
                                    <span className='user-result'>Результат теста: {user.resultTest.join(', ')}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Пользователи не найдены</p>
            )}
        </div>
    );
};

export default GetUsers;
