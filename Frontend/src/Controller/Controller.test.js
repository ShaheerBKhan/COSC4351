import axiosAPI from './axiosAPI';
import { profileGet, profilePost, verifyProfileStatus, registerPost, loginPost, userIdGet, verifyLoginStatus, logoutPost, tablesGet, reservationGet, reservationPost } from './Controller';

jest.mock('./axiosAPI');

describe('profileGet', () => {
  it('should expose a function', () => {
		expect(profileGet).toBeDefined();
	});
  
  it('profileGet should return expected output', async () => {
    // const retValue = await profileGet(userId);
    expect(false).toBeTruthy();
  });
});
describe('profilePost', () => {
  it('should expose a function', () => {
		expect(profilePost).toBeDefined();
	});
  
  it('profilePost should return expected output', async () => {
    // const retValue = await profilePost(info);
    expect(false).toBeTruthy();
  });
});
describe('verifyProfileStatus', () => {
  it('should expose a function', () => {
		expect(verifyProfileStatus).toBeDefined();
	});
  
  it('verifyProfileStatus should return expected output', async () => {
    // const retValue = await verifyProfileStatus(userId);
    expect(false).toBeTruthy();
  });
});
describe('registerPost', () => {
  it('should expose a function', () => {
		expect(registerPost).toBeDefined();
	});
  
  it('registerPost should return expected output', async () => {
    // const retValue = await registerPost(info);
    expect(false).toBeTruthy();
  });
});
describe('loginPost', () => {
  it('should expose a function', () => {
		expect(loginPost).toBeDefined();
	});
  
  it('loginPost should return expected output', async () => {
    // const retValue = await loginPost(user);
    expect(false).toBeTruthy();
  });
});
describe('userIdGet', () => {
  it('should expose a function', () => {
		expect(userIdGet).toBeDefined();
	});
  
  it('userIdGet should return expected output', async () => {
    // const retValue = await userIdGet();
    expect(false).toBeTruthy();
  });
});
describe('verifyLoginStatus', () => {
  it('should expose a function', () => {
		expect(verifyLoginStatus).toBeDefined();
	});
  
  it('verifyLoginStatus should return expected output', async () => {
    // const retValue = await verifyLoginStatus(token);
    expect(false).toBeTruthy();
  });
});
describe('logoutPost', () => {
  it('should expose a function', () => {
		expect(logoutPost).toBeDefined();
	});
  
  it('logoutPost should return expected output', async () => {
    // const retValue = await logoutPost(loginToken);
    expect(false).toBeTruthy();
  });
});
describe('tablesGet', () => {
  it('should expose a function', () => {
		expect(tablesGet).toBeDefined();
	});
  
  it('tablesGet should return expected output', async () => {
    // const retValue = await tablesGet(guestCount,timings,date);
    expect(false).toBeTruthy();
  });
});
describe('reservationGet', () => {
  it('should expose a function', () => {
		expect(reservationGet).toBeDefined();
	});
  
  it('reservationGet should return expected output', async () => {
    // const retValue = await reservationGet(userId);
    expect(false).toBeTruthy();
  });
});
describe('reservationPost', () => {
  it('should expose a function', () => {
		expect(reservationPost).toBeDefined();
	});
  
  it('reservationPost should return expected output', async () => {
    // const retValue = await reservationPost(reservation);
    expect(false).toBeTruthy();
  });
});