import React from 'react';
import { connect } from 'react-redux';

import { clientActions } from '../reducers/clientActions';
import { mapStateToProps, mergeProps } from '../reducers/util';

const GDPR = (): JSX.Element => (
  <div className="gdpr">
    <h1 className="gdpr_header">GDPR</h1>
    <p>
      Et voluptates beatae ratione non autem expedita. Magnam laudantium asperiores laborum ut laborum est odio et. Consequatur amet qui non fugiat temporibus rerum ad error. Doloribus nemo reprehenderit et est.
    </p>
    <p>
      Sint mollitia dicta tempora doloremque pariatur temporibus necessitatibus voluptate. Vel qui non ut molestiae accusantium iusto. Et mollitia est cupiditate consectetur eos voluptatibus.
    </p>
    <p>
      Voluptate similique harum ex maxime rerum dolore earum et. Voluptatibus et eum dolorem illum officia qui. Quos laudantium rem voluptate facilis perspiciatis eos eos ullam. Architecto nemo cupiditate nam eos explicabo sunt. Sunt voluptas nihil laboriosam nam. Eum consequuntur debitis voluptas ipsa laboriosam temporibus.
    </p>
    <p>
      Doloremque praesentium eligendi corrupti. Impedit explicabo labore laborum at culpa explicabo dolorum praesentium. Expedita earum necessitatibus maiores ut enim et illum.
    </p>
    <p>
      Occaecati ut laudantium nemo quis perspiciatis. Nobis eum quas sequi blanditiis. Voluptas nobis omnis quasi voluptatem doloribus laudantium corporis. Molestiae ratione unde voluptatem repellendus et deserunt accusamus perferendis. Ullam similique maxime repellat animi maiores. Vitae optio repudiandae nostrum molestias et et.
    </p>
  </div>
);

export default connect(mapStateToProps, clientActions, mergeProps)(GDPR);
