<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class UserTest extends TestCase {

    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample() {
        //$response = $this->call('GET', 'api/user/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2F1dGhlbnRpY2F0ZSIsImlhdCI6MTQ4MjU4MzM2OSwiZXhwIjoxNDgyNTg2OTY5LCJuYmYiOjE0ODI1ODMzNjksImp0aSI6ImUxM2QxYjQ1Nzk3N2ZkN2UwYWJlOTNiMzJlMDhkOWRjIn0.Bb6o1OKzr1l-78AZP_j8xoq8gXilBsInU1xptAlFC7o');
        $response = $this->call('POST','api/authenticate/?email=&password=');
        $this->assertEquals(200, $response->status());
    }

}
